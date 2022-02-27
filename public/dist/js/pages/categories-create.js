$('.nav-link').removeClass('active');
$('.nav-item').removeClass('menu-open');
$('.nav-treeview').css('display','none');
$('#group-category-sidebar').addClass('active');
$('#create-category-sidebar').addClass('active');
$('#group-category-menu-open').addClass('menu-open');
$('#group-category-menu-open ul').css('display','block');
var pageRoutes = `<li class="breadcrumb-item active page-links" data-url='/categories' id="route-categories"><a>دسته بندی ها</a></li>`;
$('#page-routes').html(pageRoutes);
setPageData(pageParentId);
setPageRoutes(pageParentId);
function setPageData(parent_id){
            let api = new Api();
            let response = api.getCategories('all');
            let parentSelectOption = document.getElementById('form-category-parent');
            let showParentSelectOption = document.getElementById('form-category-showParent');

            parentSelectOption.innerHTML = '';
            showParentSelectOption.innerHTML = '';
            response.done(function(data,status){
                let categories = data['data']['categories'];
                for(key in categories)
                {
                    var item = categories[key];
                    let option = document.createElement('OPTION');
                    option.value = item.id;
                    option.innerHTML = item.name;
                    parentSelectOption.appendChild(option);
                }
                let option = document.createElement('OPTION');
                    option.value = 0;
                    option.innerHTML = 'اصلی';
                    parentSelectOption.appendChild(option);
                    parentSelectOption.value = parent_id;
                    showParentSelectOption.innerHTML = parentSelectOption.innerHTML;
                    showParentSelectOption.value = parent_id;

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
function setPageRoutes(parent_id)
{
    let api = new Api();
    pageParentId = parent_id;
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
        a.innerHTML = 'افزودن دسته';
        li.appendChild(a);
        pageRoutes.appendChild(li);
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        $('#NotiflixLoadingWrap').remove();
        Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
    });
}

