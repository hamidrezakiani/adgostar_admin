if(!propertyCreatePageScript){

        propertyCreatePageScript = true;
           $(document).on('click','#btn-create-property',function(){
           $('.errors').css('display','none');
           Notiflix.Loading.Pulse('لطفا صبر کنید...');
           var data = new FormData();
           data.append('product_id',$('#form-property-product').val());
           data.append('property_type_id',$('#form-property-type').val());
           data.append('label',$('#form-property-label').val());
           data.append('size',$('#form-property-size').val());
           if($('#form-property-placeholder').val().length)
           data.append('placeholder',$('#form-property-placeholder').val());
           if($('#form-property-tooltip').val().length)
           data.append('tooltip',$('#form-property-tooltip').val());
           if($('#form-property-required').prop('checked'))
              data.append('required','YES');
           else
              data.append('required','NO');
           let api = new Api();
           let response = api.storeProperty(data);
           response.done(function(data,status){
              $('#NotiflixLoadingWrap').remove();
              $('#form-item-name').val('');
              Notiflix.Report.Success("موفق",'خصوصیات با موفقیت ایجاد شد','باشه');
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
