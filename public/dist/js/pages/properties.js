loadProperties(pageProductId,pageFlag);
function updateProperty(data,id)
          {
           let api = new Api();
           let response = api.updateProperty(data,id);
           response.done(function(data,status){
              Notiflix.Notify.Success('با موفقیت ویرایش شد');
              loadProperties(pageProductId,pageFlag);
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
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
                       Notiflix.Notify.Failure(data['errors'][key][0]);
                   }
                   if(!errors)
                   Notiflix.Notify.Failure('خطای سرور');
               }
           });
}

function loadProperties(product_id = null,flag = 'all')
          {
           let api = new Api();
           let response = api.getProperties(flag,product_id);
           response.done(function(data,status){
               $('.notiflix-block-wrap').remove();
               let properties = data['data']['properties'];
               var table = document.getElementById('property-table');
               table.innerHTML = '';
               if(properties.length == 0)
               Notiflix.Notify.Warning('خصوصیاتی یافت نشد');
               for(key in properties)
               {
                  var property = properties[key];
                  var tr = document.createElement('TR');
                  var td = document.createElement('TD');
                  td.innerHTML = ++key;
                  // tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('property-productName');
                //   td.classList.add('page-links');
                  td.setAttribute('date-url',`/products?product_id=${property.product_id}`);
                  td.setAttribute('data-id',property.id);
                  td.innerHTML = property.productName;
                  tr.appendChild(td);
                   td = document.createElement('TD');
                  td.classList.add('property-typeName');
                //   td.classList.add('page-links');
                  td.setAttribute('date-url',`/products?product_id=${property.product_id}`);
                  td.setAttribute('data-id',property.id);
                  td.innerHTML = property.typeName;
                  tr.appendChild(td);
                  //////////////
                  td = document.createElement('TD');
                  td.classList.add('property-label');
                  td.setAttribute('data-id',property.id);
                  td.innerHTML = property.label;
                  tr.appendChild(td);
                  ////////////////
                  td = document.createElement('TD');
                  td.classList.add('property-size');
                  td.setAttribute('data-id',property.id);
                  td.innerHTML = property.size;
                  tr.appendChild(td);
                  ///////////////
                  td = document.createElement('TD');
                  td.classList.add('property-placeholder');
                  td.setAttribute('data-id',property.id);
                  td.innerHTML = property.placeholder;
                  tr.appendChild(td);
                  //////////////////
                  td = document.createElement('TD');
                  td.classList.add('property-tooltip');
                  td.setAttribute('data-id',property.id);
                  td.innerHTML = property.tooltip;
                  tr.appendChild(td);
                  //////////////////
                  td = document.createElement('TD');
                  var label = document.createElement('LABEL');
                  label.classList.add('switch');
                  var input = document.createElement('INPUT');
                  input.setAttribute('type','checkbox');
                  input.setAttribute('data-id',property.id);
                  input.classList.add('property-required');
                  if(property.required == 'YES')
                  input.checked = "checked";
                  var span = document.createElement('SPAN');
                  span.classList.add('toggle-switch');
                  label.appendChild(input);
                  label.appendChild(span);
                  td.appendChild(label);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-danger fa fa-trash operator remove-property';
                  button.setAttribute('data-id',property.id);
                  td.appendChild(button);
                  tr.setAttribute('data-id',property.id);
                  tr.appendChild(td);
                  tr.classList.add('property');
                  tr.style.cursor = 'pointer';
                  table.appendChild(tr);
               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               $('#NotiflixLoadingWrap').remove();
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}

function setProductsSelectOptions(element){
    let api = new Api();
    let select = document.createElement('SELECT');
    let response = api.getProducts('all');
    select.classList.add('form-control');
    response.done(function(data,status){
        let products = data['data']['products'];
        let option1 = document.createElement('OPTION');
        option1.innerHTML = 'انتخاب کنید';
        select.appendChild(option1);
        for(key in products)
        {
            var item = products[key];
            let option = document.createElement('OPTION');
            option.value = item.id;
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        select.setAttribute('data-id',element.getAttribute('data-id'));
        $(`#select-property-productName`).remove();
        select.setAttribute('id','select-property-productName');
        element.appendChild(select);
        specifiedElement = document.getElementById('select-property-productName');
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        if(jqXHR.status==0)
            Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
        else
            Notiflix.Notify.Failure('خطای سرور');
    });
}

function setPropertyTypesSelectOptions(element){
    let api = new Api();
    let select = document.createElement('SELECT');
    let response = api.getProperties('types');
    select.classList.add('form-control');
    response.done(function(data,status){
        let types = data['data'];
        let option1 = document.createElement('OPTION');
        option1.innerHTML = 'انتخاب کنید';
        select.appendChild(option1);
        for(key in types)
        {
            var item = types[key];
            let option = document.createElement('OPTION');
            option.value = item.id;
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        select.setAttribute('data-id',element.getAttribute('data-id'));
        $(`#select-property-typeName`).remove();
        select.setAttribute('id','select-property-typeName');
        element.appendChild(select);
        specifiedElement = document.getElementById('select-property-productName');
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        if(jqXHR.status==0)
            Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
        else
            Notiflix.Notify.Failure('خطای سرور');
    });
}



