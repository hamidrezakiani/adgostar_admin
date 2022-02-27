setPageData(pageProductId);
function setPageData(category_id){
            let api = new Api();
            let response = api.getProducts('all');
            let productSelectOption = document.getElementById('form-item-product');
            productSelectOption.innerHTML = '';
            response.done(function(data,status){
                let products = data['data']['products'];
                let option = document.createElement('OPTION');
                option.innerHTML = 'انتخاب کنید';
                option.selected = true;
                productSelectOption.appendChild(option);
                for(key in products)
                {
                    var item = products[key];
                    option = document.createElement('OPTION');
                    option.value = item.id;
                    option.innerHTML = item.name;
                    productSelectOption.appendChild(option);
                }
                if(category_id != '')
                productSelectOption.value = category_id;

            });
            response.fail(function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR.status);
                console.log(textStatus);
                console.log(errorThrown);
                if(jqXHR.status==0)
                {
                    Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                }
                    else
                {
                    var data =JSON.parse(jqXHR.responseText);
                    var errors = false;
                    for(key in data['errors'])
                    {
                        errors = true;
                        Notiflix.Notify.Failure(data['errors'][key]);
                    }
                    if(!errors)
                    Notiflix.Notify.Failure('خطای سرور');
                }
            });
}

