$('.nav-link').removeClass('active');
$('.nav-item').removeClass('menu-open');
$('.nav-treeview').css('display','none');
$('#group-product-sidebar').addClass('active');
$('#list-product-sidebar').addClass('active');
$('#group-product-menu-open').addClass('menu-open');
$('#group-product-menu-open ul').css('display','block');
var pageRoutes = `<li class="breadcrumb-item active page-links" data-url='/categories' id="route-categories"><a>محصولات</a></li>`;
$('#page-routes').html(pageRoutes);
loadProducts(pageFlag,pageCategoryId);
setPageRoutes(pageCategoryId);
function updateProduct(data,id)
          {
           let api = new Api();
           let response = api.updateProduct(data,id);
           response.done(function(data,status){
              Notiflix.Notify.Success('با موفقیت ویرایش شد');
              loadProducts(pageFlag,pageCategoryId);
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
                       Notiflix.Notify.Failure(data['errors'][key][0]);
                   }
                   if(!errors)
                   Notiflix.Notify.Failure('خطای سرور');
               }
           });
}

function loadProducts(flag,category_id = null)
          {
           let api = new Api();
           pageCategoryId = category_id;
           pageFlag = flag;
           let response = api.getProducts(flag,category_id);
           response.done(function(data,status){
               $('.notiflix-block-wrap').remove();
               let products = data['data']['products'];
               var table = document.getElementById('product-table');
               table.innerHTML = '';
               if(products.length == 0)
               Notiflix.Notify.Warning('محصولی یافت نشد');
               for(key in products)
               {
                  var item = products[key];
                  var tr = document.createElement('TR');
                  var td = document.createElement('TD');
                  td.innerHTML = ++key;
                  // tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('product-name');
                  td.setAttribute('data-id',item.id);
                  td.innerHTML = item.name;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('product-categoryName');
                  td.setAttribute('data-id',item.id);
                  td.innerHTML = item.categoryName;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('product-periodType');
                  td.innerHTML = item.periodTypeName;
                  td.setAttribute('data-id',item.id);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  var label = document.createElement('LABEL');
                  label.classList.add('switch');
                  var input = document.createElement('INPUT');
                  input.setAttribute('type','checkbox');
                  input.setAttribute('data-id',item.id);
                  input.classList.add('product-viewable');
                  if(item.viewable == 'YES')
                  input.checked = "checked";
                  var span = document.createElement('SPAN');
                  span.classList.add('toggle-switch');
                  label.appendChild(input);
                  label.appendChild(span);
                  td.appendChild(label);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('product-details');
                  td.innerHTML = `آیتم ها : ${item.count_item}<br>خصوصیات : ${item.count_property}`;
                  tr.setAttribute('data-id',item.id);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('product-operator');
                  if(item.count_item > 0)
                  {
                  var button = document.createElement('BUTTON');
                  button.className = 'btn btn-info operator items page-links';
                  button.setAttribute('data-id',item.id);
                  button.setAttribute('data-url',`/items?product_id=${item.id}`);
                  button.innerHTML = 'آیتم ها';
                  td.appendChild(button);
                  }
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-success operator add-item page-links';
                  button.setAttribute('data-url',`/items-create?product_id=${item.id}`);
                  button.setAttribute('data-id',item.id);
                  button.innerHTML = '+ آیتم';
                  td.appendChild(button);
                  if(item.count_property > 0)
                  {
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-info operator properties page-links';
                  button.setAttribute('data-id',item.id);
                  button.setAttribute('data-url',`/properties?product_id=${item.id}`);
                  button.innerHTML = 'خصوصیات';
                  td.appendChild(button);
                  }
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-warning operator add-property page-links';
                  button.setAttribute('data-id',item.id);
                  button.setAttribute('data-url',`/property-create?product_id=${item.id}`);
                  button.innerHTML = '+ خصوصیات';
                  td.appendChild(button);
                  //-------
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-danger fa fa-trash operator remove-product';
                  button.setAttribute('data-id',item.id);
                  td.appendChild(button);
                  tr.setAttribute('data-id',item.id);
                  tr.appendChild(td);
                  tr.classList.add('product');
                  tr.style.cursor = 'pointer';
                  table.appendChild(tr);
               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               $('#NotiflixLoadingWrap').remove();
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
               console.log(jqXHR.status);
               console.log(textStatus);
               console.log(errorThrown);
           });
}

function setPageRoutes(parent_id)
{
        let api = new Api();
        let response = api.getCategories('routes',parent_id);
        response.done(function(data,status){
            let routes = data['data'];
            var pageRoutes = document.getElementById('page-routes');
            $('#route-categories').nextAll().remove();
            for(key in routes)
            {
               var li = document.createElement('LI');
               li.className = 'breadcrumb-item';
               var a = document.createElement('A');
               a.innerHTML = routes[key].name;
               a.setAttribute('data-url',`/categories?parent=${routes[key].id}`);
               a.classList.add('page-links');
               li.appendChild(a);
               pageRoutes.appendChild(li);
           }

    var li = document.createElement('LI');
    li.className = 'breadcrumb-item';
    li.setAttribute('id','list-label');
    var a = document.createElement('A');
    a.innerHTML = 'لیست محصولات';
    li.appendChild(a);
    pageRoutes.appendChild(li);
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
            $('#NotiflixLoadingWrap').remove();
            Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
        });

}

function setCategoriesSelectOptions(element){
    let api = new Api();
    let select = document.createElement('SELECT');
    let response = api.getCategories('allowedProduct');
    select.classList.add('form-control');
    response.done(function(data,status){
        let categories = data['data']['categories'];
        let option1 = document.createElement('OPTION');
        option1.innerHTML = 'انتخاب کنید';
        select.appendChild(option1);
        for(key in categories)
        {
            var item = categories[key];
            let option = document.createElement('OPTION');
            option.value = item.id;
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        select.setAttribute('data-id',element.getAttribute('data-id'));
        $(`.select-categoryName`).remove();
        select.classList.add('select-categoryName');
        element.appendChild(select);
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



