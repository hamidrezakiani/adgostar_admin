$('.nav-link').removeClass('active');
$('.nav-item').removeClass('menu-open');
$('.nav-treeview').css('display','none');
$('#group-participation-sidebar').addClass('active');
$('#group-participation-menu-open').addClass('menu-open');
var pageRoutes = `<li class="breadcrumb-item active page-links" data-url='/participations' id="route-categories"><a>مشارکت ها</a></li>`;
$('#page-routes').html(pageRoutes);
loadParticipations(pageFlag,pageExecuterId);
function updateParticipation(data,id)
          {
           let api = new Api();
           let response = api.updateParticipation(data,id);
           response.done(function(data,status){
              Notiflix.Notify.Success('با موفقیت ویرایش شد');
              loadParticipations(pageFlag,pageExecuterId);
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

function loadParticipations(flag = 'all',executer_id = null)
          {
           let api = new Api();
           let response = api.getParticipations(flag,executer_id);
           response.done(function(data,status){
               let participations = data['data']['participations'];
               var table = document.getElementById('participation-table');
               table.innerHTML = '';
               if(participations.length == 0)
               Notiflix.Notify.Warning('مشارکتی یافت نشد');
               for(key in participations)
               {
                  var participation = participations[key];
                  var tr = document.createElement('TR');
                  var td = document.createElement('TD');
                  td.innerHTML = ++key;
                  // tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('participation-executerName');
                  td.innerHTML = participation.executerName;
                  tr.appendChild(td);
                  //////////
                  td = document.createElement('TD');
                  td.classList.add('participation-productName');
                  td.innerHTML = participation.productName;
                  tr.appendChild(td);
                  //////////////
                  td = document.createElement('TD');
                  td.classList.add('participation-itemName');
                  td.setAttribute('data-id',participation.id);
                  td.setAttribute('data-product_id',participation.product_id);
                  td.innerHTML = participation.itemName;
                  tr.appendChild(td);
                  /////////
                  td = document.createElement('TD');
                  td.classList.add('participation-countPeriod');
                  td.innerHTML = participation.countPeriod;
                  tr.appendChild(td);
                  /////////
                  td = document.createElement('TD');
                  td.classList.add('participation-operator');
                  var button = document.createElement('BUTTON');
                  button.className = 'btn btn-info operator periods';
                  button.setAttribute('data-id',participation.id);
                //   button.setAttribute('data-url',`/periods?participation_id=${participation.id}`);
                  button.innerHTML = 'بازه ها';
                  td.appendChild(button);
                  tr.appendChild(td);
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

function setItemsSelectOptions(element,product_id){
    let api = new Api();
    let select = document.createElement('SELECT');
    let response = api.getItems('productItems',product_id);
    select.classList.add('form-control');
    response.done(function(data,status){
        let items = data['data']['items'];
        let option1 = document.createElement('OPTION');
        option1.innerHTML = 'انتخاب کنید';
        select.appendChild(option1);
        for(key in items)
        {
            var item = items[key];
            let option = document.createElement('OPTION');
            option.value = item.id;
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        select.setAttribute('data-id',element.getAttribute('data-id'));
        $(`.select-participationItem`).remove();
        select.classList.add('select-participationItem');
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

function loadPeriods(participation_id = null,flag = 'participationPeriods',)
{
           let api = new Api();
           let response = api.getParticipationPeriods(flag,participation_id);
           response.done(function(data,status){
               let periods = data['data']['periods'];
               var table = document.getElementById('period-table');
               table.innerHTML = '';
               if(periods.length == 0)
               Notiflix.Notify.Warning('بازه ای یافت نشد');
               for(key in periods)
               {
                  var period = periods[key];
                  var tr = document.createElement('TR');
                  var td = document.createElement('TD');
                  td.innerHTML = ++key;
                  tr.appendChild(td);
                  ///////
                  td = document.createElement('TD');
                  td.innerHTML = period.start;
                  tr.appendChild(td);
                  //////////
                  td = document.createElement('TD');
                  td.innerHTML = period.end;
                  tr.appendChild(td);
                  //////////////
                  td = document.createElement('TD');
                  td.innerHTML = period.cost;
                  tr.appendChild(td);
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


