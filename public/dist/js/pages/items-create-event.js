if(!itemCreatePageScript){

        itemCreatePageScript = true;
           $(document).on('click','#btn-create-item',function(){
           $('.errors').css('display','none');
           Notiflix.Loading.Pulse('لطفا صبر کنید...');
           var data = new FormData();
           data.append('name',$('#form-item-name').val());
           data.append('product_id',$('#form-item-product').val());
           data.append('viewable',$('#form-item-viewable').val());
           let api = new Api();
           let response = api.storeItem(data);
           response.done(function(data,status){
              $('#NotiflixLoadingWrap').remove();
              $('#form-item-name').val('');
              Notiflix.Report.Success("موفق",'ایتم با موفقیت ایجاد شد','باشه');
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
