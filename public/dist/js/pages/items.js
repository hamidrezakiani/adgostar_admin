loadItems(pageProductId,pageFlag);
function updateItem(data,id)
          {
           let api = new Api();
           let response = api.updateItem(data,id);
           response.done(function(data,status){
              Notiflix.Notify.Success('با موفقیت ویرایش شد');
              loadItems(pageProductId,pageFlag);
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

function loadItems(product_id = null,flag = 'all')
          {
           let api = new Api();
           let response = api.getItems(flag,product_id);
           response.done(function(data,status){
               $('.notiflix-block-wrap').remove();
               let items = data['data']['items'];
               var table = document.getElementById('item-table');
               table.innerHTML = '';
               if(items.length == 0)
               Notiflix.Notify.Warning('آیتمی یافت نشد');
               for(key in items)
               {
                  var item = items[key];
                  var tr = document.createElement('TR');
                  var td = document.createElement('TD');
                  td.innerHTML = ++key;
                  // tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('item-name');
                  td.setAttribute('data-id',item.id);
                  td.innerHTML = item.name;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('item-productName');
                //   td.classList.add('page-links');
                  td.setAttribute('date-url',`/products?product_id=${item.product_id}`);
                  td.setAttribute('data-id',item.id);
                  td.innerHTML = item.productName;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  var label = document.createElement('LABEL');
                  label.classList.add('switch');
                  var input = document.createElement('INPUT');
                  input.setAttribute('type','checkbox');
                  input.setAttribute('data-id',item.id);
                  input.classList.add('item-viewable');
                  if(item.viewable == 'YES')
                  input.checked = "checked";
                  var span = document.createElement('SPAN');
                  span.classList.add('toggle-switch');
                  label.appendChild(input);
                  label.appendChild(span);
                  td.appendChild(label);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  var button = document.createElement('BUTTON');
                  button.className = 'btn btn-info operator item-periods';
                  button.setAttribute('data-id',item.id);
                  button.innerHTML = 'بازه ها';
                  td.appendChild(button);
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-danger fa fa-trash operator remove-item';
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
        $(`.select-productName`).remove();
        select.classList.add('select-productName');
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

function setExecuterPeriods(id)
{
    let api = new Api();
    let response = api.getParticipationPeriods('itemParticipationPeriods',id);
    response.done(function(data,status){

               if(status == 'success')
               {
                   let periods = data['data']['periods'];
                   var table = document.getElementById('executer-period-table');
                   table.innerHTML = '';
                   if(periods.length == 0)
                   Notiflix.Notify.Warning('بازه ای یافت نشد');
               for(key in periods)
               {
                  var period = periods[key];
                  var tr = document.createElement('TR');
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
               }
               else
               {
                  var table = document.getElementById('executer-period-table');
                   table.innerHTML = '';
                   var tr = document.createElement('TR');
                   var td = document.createElement('TD');
                   var span = document.createElement('SPAN');
                   span.className = 'text-warning';
                   span.innerHTML = 'هیچ مجری به این آیتم وصل نشده!';
                   td.appendChild(span);
                   td.setAttribute('colspan',4);
                   tr.appendChild(td);
                   table.appendChild(tr);
               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               $('#NotiflixLoadingWrap').remove();
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}

function setItemPeriods(id)
{
  let api = new Api();
    let response = api.getItemPeriods('itemPeriods',id);
    response.done(function(data,status){

                   let periods = data['data']['periods'];
                   if(periods.length == 0)
                   Notiflix.Notify.Warning('بازه ای یافت نشد');
                   var addPeriodDiv = document.getElementById('periods');
                   addPeriodDiv.innerHTML = '';
                   var countRow = 0;
                   for(key in periods)
                   {
                    item = periods[key];
                    var div = document.createElement('DIV');
                    var cardDiv = document.createElement('DIV');
                    cardDiv.className = 'card period-row col-12';
                    cardDiv.setAttribute('data-countRow',countRow);
                    div.className = 'row';
                    var colDiv = document.createElement('DIV');
                    colDiv.className = 'input-group mb-1 col-xl-3 col-lg-3 col-md-3 col-sm-12';
                    var divPrepend = document.createElement('DIV');
                    divPrepend.classList = 'input-group-prepend';
                    var span = document.createElement('SPAN');
                    span.className = 'btn btn-block btn-primary disabled';
                    span.innerHTML = 'از';
                    divPrepend.appendChild(span);
                    colDiv.appendChild(divPrepend);
                    var input = document.createElement('INPUT');
                    input.setAttribute('type','number');
                    input.className = 'form-control period-from';
                    input.setAttribute('data-countRow',countRow);
                    input.value = item.start;
                    input.disabled = true;
                    colDiv.appendChild(input);
                    div.appendChild(colDiv);
                    /////////////////
                    colDiv = document.createElement('DIV');
                    colDiv.className = 'input-group mb-1 col-xl-4 col-lg-4 col-md-4 col-sm-12';
                    divPrepend = document.createElement('DIV');
                    divPrepend.classList = 'input-group-prepend';
                    span = document.createElement('SPAN');
                    span.className = 'btn btn-block btn-primary disabled';
                    span.innerHTML = 'تا';
                    divPrepend.appendChild(span);
                    colDiv.appendChild(divPrepend);
                    input = document.createElement('INPUT');
                    input.setAttribute('type','number');
                    input.className = 'form-control period-to';
                    input.setAttribute('data-countRow',countRow);
                    input.setAttribute('placeholder','بی نهایت');
                    input.value = item.end;
                    if(key != periods.length - 1)
                    {
                          input.disabled = true;
                    }
                    colDiv.appendChild(input);
                    div.appendChild(colDiv);
                    //////////////
                    colDiv = document.createElement('DIV');
                    colDiv.className = 'input-group mb-1 col-xl-5 col-lg-5 col-md-5 col-sm-12';
                    divPrepend = document.createElement('DIV');
                    divPrepend.classList = 'input-group-prepend';
                    span = document.createElement('SPAN');
                    span.className = 'btn btn-block btn-primary disabled';
                    span.innerHTML = 'زمان(س)';
                    divPrepend.appendChild(span);
                    colDiv.appendChild(divPrepend);
                    input = document.createElement('INPUT');
                    input.setAttribute('type','number');
                    input.className = 'form-control period-time';
                    input.setAttribute('data-countRow',countRow);
                    input.setAttribute('placeholder','زمان را وارد کنید');
                    input.value = item.time;
                    colDiv.appendChild(input);
                    if(key == periods.length - 1 && countRow > 0)
                    {
                        divPrepend = document.createElement('DIV');
                        divPrepend.classList = 'input-group-prepend';
                        span = document.createElement('SPAN');
                        span.className = 'btn btn-block btn-danger fa fa-minus';
                        span.setAttribute('data-countRow',countRow);
                        span.setAttribute('id','remove-last-period');
                        divPrepend.appendChild(span);
                        colDiv.appendChild(divPrepend);
                    }
                    div.appendChild(colDiv);
                    ////////////
                    cardDiv.appendChild(div);
                    addPeriodDiv.appendChild(cardDiv);
                    countRow++;
                    $('#add-new-period').attr('data-countRow',countRow);
                    $('#save-period-changes').attr('data-countRow',countRow);
               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               $('#NotiflixLoadingWrap').remove();
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}

function addNewPeriodRow(countRow,from)
{
    var addPeriodDiv = document.getElementById('periods');
    var div = document.createElement('DIV');
    var cardDiv = document.createElement('DIV');
    cardDiv.className = 'card period-row col-12';
    cardDiv.setAttribute('data-countRow',countRow);
    div.className = 'row';
    var colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-3 col-lg-3 col-md-3 col-sm-12';
    var divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    var span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'از';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    var input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-from';
    input.setAttribute('data-countRow',countRow);
    input.value = from;
    input.disabled = true;
    colDiv.appendChild(input);
    div.appendChild(colDiv);
    ///////////////
    colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-4 col-lg-4 col-md-4 col-sm-12';
    divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'تا';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-to';
    input.setAttribute('data-countRow',countRow);
    input.setAttribute('placeholder','بی نهایت');
    colDiv.appendChild(input);
    div.appendChild(colDiv);
    ///////////
    colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-5 col-lg-5 col-md-5 col-sm-12';
    divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'زمان(س)';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-time';
    input.setAttribute('data-countRow',countRow);
    input.setAttribute('placeholder','زمان را وارد کنید');
    colDiv.appendChild(input);
    divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-danger fa fa-minus';
    span.setAttribute('data-countRow',countRow);
    span.setAttribute('id','remove-last-period');
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    div.appendChild(colDiv);
    /////////
    cardDiv.appendChild(div);
    addPeriodDiv.appendChild(cardDiv);
    countRow++;
    $('#add-new-period').attr('data-countRow',countRow);
    $('#save-period-changes').attr('data-countRow',countRow);
}

function storePeriods(countRow,item_id)
{
    Notiflix.Loading.Pulse('لطفا صبر کنید...');
    var data = new FormData();
    var periodArray = {};
    var timeError = false;
    var PeriodError = false;
    for(var i=0;i < countRow;i++)
    {
       var periodItem = {};
       periodItem.start = $(`.period-from[data-countRow=${i}]`).val();
       if(Number.parseInt($(`.period-to[data-countRow=${i}]`).val()))
       {
           periodItem.end = $(`.period-to[data-countRow=${i}]`).val();
           if(Number.parseInt(periodItem.end) <= Number.parseInt(periodItem.start))
           {
               PeriodError = true;
               $(`.period-to[data-countRow=${i}]`).addClass('input-error');
           }
       }
       periodItem.time = $(`.period-time[data-countRow=${i}]`).val();
       if(!Number.parseInt(periodItem.time))
       {
          timeError = true;
          $(`.period-time[data-countRow=${i}]`).addClass('input-error');
       }
       periodArray[i] = periodItem;
    }
    if(!timeError && !PeriodError)
    {
       console.log(periodArray);
           var data = new FormData();
           data.append('periodArray',`${JSON.stringify(periodArray)}`);
           let api = new Api();
           let response = api.updateItemPeriods(data,item_id);
           response.done(function(data,status){
              $('#NotiflixLoadingWrap').remove();
              Notiflix.Report.Success("موفق",'تعییرات با موفقیت ذخیره شد','باشه');
              setItemPeriods(item_id);
            });
              response.fail(function(jqXHR, textStatus, errorThrown){
                  $('#NotiflixLoadingWrap').remove();
                  if(jqXHR.status==0)
                  {
                      Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                  }
                  else if(jqXHR.status != 403 && jqXHR.status != 401 && jqXHR.status != 422)
                  {
                    Notiflix.Report.Failure("خطا","خطای سرور","باشه");
                  }
                  else if(jqXHR.status == 403)
                  {
                      Notiflix.Report.Failure("خطا","خطای سرور","باشه");
                  }
                  else
                  {
                      var data = JSON.parse(jqXHR.responseText);
                      var errors = "";
                      for(key in data['errors'])
                      {
                          errors += data['errors'][key] + " , ";
                      }
                      Notiflix.Report.Failure("خطا",errors,'باشه');
                  }
              });
    }
    else
    {
        $('#NotiflixLoadingWrap').remove();
        if(timeError)
          Notiflix.Report.Failure('خطا','فیلد های زمان نمیتواند خالی باشد.','باشه');

        if(PeriodError)
          Notiflix.Report.Failure("خطا","پایان بازه باید بزرگتر از شروع بازه باشد.","باشه");
    }

}



