setPageData(pageProductId);
function setPageData(product_id){
            let api = new Api();
            let response = api.getProducts('all');
            let productSelectOption = document.getElementById('form-property-product');
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
                if(product_id != '')
                productSelectOption.value = product_id;

            });
            response.fail(function(jqXHR, textStatus, errorThrown){
                if(jqXHR.status==0)
                    Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                else
                    Notiflix.Notify.Failure('خطای سرور');
            });

            response = api.getProperties('types');
            let PropertyTypeSelectOption = document.getElementById('form-property-type');
            PropertyTypeSelectOption.innerHTML = '';
            response.done(function(data,status){
                let types = data['data'];
                let option = document.createElement('OPTION');
                option.innerHTML = 'انتخاب کنید';
                option.selected = true;
                PropertyTypeSelectOption.appendChild(option);
                for(key in types)
                {
                    var item = types[key];
                    option = document.createElement('OPTION');
                    option.value = item.id;
                    option.innerHTML = item.name;
                    PropertyTypeSelectOption.appendChild(option);
                }

            });
            response.fail(function(jqXHR, textStatus, errorThrown){
                if(jqXHR.status==0)
                    Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                else
                   Notiflix.Notify.Failure('خطای سرور');
            });
}

