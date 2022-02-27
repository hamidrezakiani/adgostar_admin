$('.nav-link').removeClass('active');
$('.nav-item').removeClass('menu-open');
$('.nav-treeview').css('display','none');
$('#group-product-sidebar').addClass('active');
$('#create-product-sidebar').addClass('active');
$('#group-product-menu-open').addClass('menu-open');
$('#group-product-menu-open ul').css('display','block');
var pageRoutes = `<li class="breadcrumb-item active page-links" data-url='/products' id="route-products"><a>محصولات</a></li>`;
$('#page-routes').html(pageRoutes);
setPageData(pageCategoryId);
setPageRoutes(pageCategoryId);
function setPageData(category_id){
            let api = new Api();
            let response = api.getCategories('allowedProduct');
            let categorySelectOption = document.getElementById('form-product-category');
            categorySelectOption.innerHTML = '';
            response.done(function(data,status){
                let categories = data['data']['categories'];
                let option = document.createElement('OPTION');
                option.innerHTML = 'انتخاب کنید';
                option.selected = true;
                categorySelectOption.appendChild(option);
                for(key in categories)
                {
                    var item = categories[key];
                    option = document.createElement('OPTION');
                    option.value = item.id;
                    option.innerHTML = item.name;
                    categorySelectOption.appendChild(option);
                }
                if(category_id != '')
                categorySelectOption.value = category_id;

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
function setPageRoutes(category_id)
{
    let api = new Api();
    pageParentId = category_id;
    let response = api.getCategories('routes',category_id);
    response.done(function(data,status){
        let routes = data['data'];
        var pageRoutes = document.getElementById('page-routes');
        $('#route-products').nextAll().remove();
        for(key in routes)
        {
           if(routes[key].id == category_id)
           {
            var li = document.createElement('LI');
            li.className = 'breadcrumb-item';
            var a = document.createElement('A');
            a.innerHTML = routes[key].name;
            a.setAttribute('data-url',`/products?category_id=${routes[key].id}`);
            a.classList.add('page-links');
            li.appendChild(a);
            pageRoutes.appendChild(li);
           }
       }
        var li = document.createElement('LI');
        li.className = 'breadcrumb-item';
        li.setAttribute('id','list-label');
        var a = document.createElement('A');
        a.innerHTML = 'افزودن محصول';
        li.appendChild(a);
        pageRoutes.appendChild(li);
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        $('#NotiflixLoadingWrap').remove();
        Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
    });
}

