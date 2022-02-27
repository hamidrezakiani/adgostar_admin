if(!categoryCreatePageScript)
    {
        categoryCreatePageScript = true;
           $(document).on('click','#btn-create-category',function(){
           $('.errors').css('display','none');
           Notiflix.Loading.Pulse('لطفا صبر کنید...');
           var data = new FormData();
           data.append('name',$('#form-category-name').val());
           data.append('label',$('#form-category-label').val());
           if($('#form-category-parent').val() != 0)
           data.append('parent_id',$('#form-category-parent').val());
           if($('#form-category-showParent').val() != 0)
           data.append('showParent_id',$('#form-category-showParent').val());
           let api = new Api();
           let response = api.storeCategory(data);
           response.done(function(data,status){
              $('#NotiflixLoadingWrap').remove();
              $('#form-category-name').val('');
              $('#form-category-label').val('');
              Notiflix.Report.Success("موفق",'دسته با موفقیت ایجاد شد','باشه');
              setPageData(pageParentId);
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

        //   $(document).on('click','.page-routes',function(){
        //       this.parentElement.classList.add('active');
        //       $(this).parent().nextAll().remove();
        //       var id = $(this).attr('data-id');
        //       loadCategories('subCats',id);
        //   });
        }
