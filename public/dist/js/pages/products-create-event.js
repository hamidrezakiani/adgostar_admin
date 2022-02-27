if(!productCreatePageScript){

        productCreatePageScript = true;
           $(document).on('click','#btn-create-product',function(){
           $('.errors').css('display','none');
           Notiflix.Loading.Pulse('لطفا صبر کنید...');
           var data = new FormData();
           data.append('name',$('#form-product-name').val());
           data.append('category_id',$('#form-product-category').val());
           data.append('periodType',$('#form-product-periodType').val());
           data.append('viewable',$('#form-product-viewable').val());
           let api = new Api();
           let response = api.storeProduct(data);
           response.done(function(data,status){
              $('#NotiflixLoadingWrap').remove();
              $('#form-category-name').val('');
              $('#form-category-label').val('');
              Notiflix.Report.Success("موفق",'محصول با موفقیت ایجاد شد','باشه');
            });
              response.fail(function(jqXHR, textStatus, errorThrown){
                  $('#NotiflixLoadingWrap').remove();
                  if(jqXHR.status==0)
                  {
                      Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                  }
                      else
                  {
                      var data = JSON.parse(jqXHR.responseText);
                      var errors = "";
                      for(key in data['errors'])
                      {
                          $(`#${key}`).children('i').html(data['errors'][key]);
                          $(`#${key}`).css('display','block');
                          errors += data['errors'][key] + " , ";
                      }
                      Notiflix.Report.Failure("خطا",'لطفا ورودی های خود را کنترل کنید.','باشه');
                  }
              });
          });
}
