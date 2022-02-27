$('.nav-link').removeClass('active');
$('.nav-item').removeClass('menu-open');
$('.nav-treeview').css('display','none');
$('#group-category-sidebar').addClass('active');
$('#list-category-sidebar').addClass('active');
$('#group-category-menu-open').addClass('menu-open');
$('#group-category-menu-open ul').css('display','block');
var pageRoutes = `<li class="breadcrumb-item active page-links" data-url='/categories' id="route-categories"><a>دسته بندی ها</a></li>`;
$('#page-routes').html(pageRoutes);
loadCategories(pageFlag,pageParentId);
setPageRoutes(pageParentId);
function updateCategory(data,id)
          {
           let api = new Api();
           let response = api.updateCategory(data,id);
           response.done(function(data,status){
              Notiflix.Notify.Success('با موفقیت ویرایش شد');
              loadCategories(pageFlag,pageParentId);
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

function loadCategories(flag,parent_id = null)
          {
           let api = new Api();
           pageParentId = parent_id;
           pageFlag = flag;
           let response = api.getCategories(flag,parent_id);
           response.done(function(data,status){
               $('.notiflix-block-wrap').remove();
               let categories = data['data']['categories'];
               var table = document.getElementById('category-table');
               table.innerHTML = '';
               if(categories.length == 0)
               Notiflix.Notify.Warning('زیر دسته ای یافت نشد');
               for(key in categories)
               {
                  var item = categories[key];
                  var tr = document.createElement('TR');
                  var td = document.createElement('TD');
                  td.innerHTML = ++key;
                  // tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('category-name');
                  td.setAttribute('data-id',item.id);
                  td.innerHTML = item.name;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('category-label');
                  td.setAttribute('data-id',item.id);
                  td.innerHTML = item.label;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.innerHTML = item.parentName;
                  td.classList.add('category-parent');
                  td.setAttribute('data-id',item.id);
                  if(!Number.isInteger(item.parent_id))
                   item.parent_id = 0;
                  td.setAttribute('data-parentId',item.parent_id);
                  td.setAttribute('data-code',item.code);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.innerHTML = item.showParentName;
                  td.classList.add('category-show-parent');
                  td.setAttribute('data-id',item.id);
                  if(!Number.isInteger(item.showParent_id))
                   item.showParent_id = 0;
                  td.setAttribute('data-showParentId',item.showParent_id);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  var label = document.createElement('LABEL');
                  label.classList.add('switch');
                  var input = document.createElement('INPUT');
                  input.setAttribute('type','checkbox');
                  input.setAttribute('data-id',item.id);
                  input.classList.add('category-show');
                  if(item.show == 'YES')
                  input.checked = "checked";
                  var span = document.createElement('SPAN');
                  span.classList.add('toggle-switch');
                  label.appendChild(input);
                  label.appendChild(span);
                  td.appendChild(label);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('category-details');
                  td.innerHTML = `محصولات : ${item.count_product}<br>زیر مجموعه : ${item.count_subCat}`;
                  tr.setAttribute('data-id',item.id);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('category-operator');
                  if(item.count_product == 0 && item.count_subCat > 0)
                  {
                  var button = document.createElement('BUTTON');
                  button.className = 'btn btn-info operator subCats page-links';
                  button.setAttribute('data-id',item.id);
                  button.setAttribute('data-url',`/categories?parent=${item.id}`);
                  button.innerHTML = 'دسته ها';
                  td.appendChild(button);
                  }
                  if(item.count_product == 0)
                  {
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-success operator add-subCat page-links';
                  button.setAttribute('data-url',`/categories-create?parent=${item.id}`);
                  button.setAttribute('data-id',item.id);
                  button.innerHTML = '+ دسته';
                  td.appendChild(button);
                  }
                  if(item.count_product > 0)
                  {
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-info operator products page-links';
                  button.setAttribute('data-url',`/products?category_id=${item.id}`);
                  button.setAttribute('data-id',item.id);
                  button.innerHTML = 'محصولات';
                  td.appendChild(button);
                  }
                  if(item.count_subCat == 0)
                  {
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-warning operator add-product page-links';
                  button.setAttribute('data-url',`/products-create?category_id=${item.id}`);
                  button.setAttribute('data-id',item.id);
                  button.innerHTML = '+ محصول';
                  td.appendChild(button);
                  }
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-danger fa fa-trash operator remove-category';
                  button.setAttribute('data-id',item.id);
                  td.appendChild(button);
                  tr.setAttribute('data-id',item.id);
                  tr.appendChild(td);
                  tr.classList.add('category');
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
    a.innerHTML = 'لیست دسته ها';
    li.appendChild(a);
    pageRoutes.appendChild(li);
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
            $('#NotiflixLoadingWrap').remove();
            Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
        });

}

function setParentSelectOptions(element,type){
    let api = new Api();
    let parentId = element.getAttribute('data-parentId');
    let id = element.getAttribute('data-id');
    let code = element.getAttribute('data-code')+':'+id;
    let select = document.createElement('SELECT');
    let response = api.getCategories('allowed',id);
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
            if(type == 'select-parent')
              option.disabled = !item.allowed;
            select.appendChild(option);
        }
        let option = document.createElement('OPTION');
        option.value = 0;
        option.innerHTML = 'اصلی';
        select.appendChild(option);
        select.setAttribute('data-id',element.getAttribute('data-id'));
        $(`.select-parent`).remove();
        $(`.select-show-parent`).remove();
        select.classList.add(type);
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



