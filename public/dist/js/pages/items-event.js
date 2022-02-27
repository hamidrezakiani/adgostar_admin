if(!itemPageScript)
    {
        itemPageScript = true;
        $(document).on('dblclick','.item-name',function(){
            if(!$(`.input-name[data-id=${$(this).attr('data-id')}]`).length)
            {

            var input = document.createElement('TEXTAREA');
            input.setAttribute('rows','2');
            input.setAttribute('cols','30');
            input.classList.add('input-item-name');
            input.classList.add('form-control');
            input.setAttribute('data-id',$(this).attr('data-id'));
            input.setAttribute('data-old',$(this).html());
            input.value = $(this).html();
            $(this).html('');
            this.appendChild(input);
            }
        });

        $(document).on('focusout','.input-item-name',function(){
            var formData = new FormData();
            formData.append('name',$(this).val());
            updateItem(formData,$(this).attr('data-id'));
            $(`.item-name[data-id=${$(this).attr('data-id')}]`).html($(this).attr('data-old'));
            $(this).remove();
        });

        $(document).on('dblclick','.item-productName',function(){
            setProductsSelectOptions(this);
        });

        $(document).on('change','.select-productName',function(){
                var formData = new FormData();
                formData.append('product_id',$(this).val());
                updateItem(formData,$(this).attr('data-id'));
                $(`.item-ProductName[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
        });

        $(document).on('change','.item-viewable',function(){
            var formData = new FormData();
            if(this.checked)
              formData.append('viewable','YES');
            else
              formData.append('viewable','NO');
            updateItem(formData,$(this).attr('data-id'));
        });

        $(document).on('click','.item-periods',function(){
           setExecuterPeriods($(this).attr('data-id'));
           setItemPeriods($(this).attr('data-id'));
           $('#save-period-changes').attr('data-id',$(this).attr('data-id'));
           $('#refresh-item-periods').attr('data-id',$(this).attr('data-id'));
           $('#periods-modal').click();
        });

        $(document).on('click','#refresh-item-periods',function(){
           setItemPeriods($(this).attr('data-id'));
        });

        $(document).on('click','#remove-last-period',function(){
          var countRow = $(this).attr('data-countRow');
          var prevPeriodFrom = $(`.period-from[data-countRow=${countRow-1}]`).val();
          var prevPeriodTime = $(`.period-time[data-countRow=${countRow-1}]`).val();
          $(`.period-from[data-countRow=${countRow}]`).val(prevPeriodFrom);
          $(`.period-time[data-countRow=${countRow}]`).val(prevPeriodTime);
          $(`.period-row[data-countRow=${countRow-1}]`).remove();
          $(`[data-countRow=${countRow}]`).attr('data-countRow',countRow -1);
          $('#add-new-period').attr('data-countRow',countRow);
          $('#save-period-changes').attr('data-countRow',countRow);
          if(countRow == 1)
          this.parentElement.remove();
        });

        $(document).on('click','#remove-all-periods',function(){
          $(`.period-row[data-countRow != 0]`).remove();
          $(`.period-to[data-countRow = 0]`).val('');
          $(`.period-to[data-countRow = 0]`).attr('disabled',false);
          $('#add-new-period').attr('data-countRow',1);
          $('#save-period-changes').attr('data-countRow',1);
        });

        $(document).on('click','#add-new-period',function(){
          var countRow = $(this).attr('data-countRow');
          lastPeriodFrom = $(`.period-from[data-countRow = ${countRow-1}]`);
          lastPeriodTo = $(`.period-to[data-countRow = ${countRow-1}]`);
          lastPeriodTime = $(`.period-time[data-countRow = ${countRow-1}]`);
          if(!Number.parseInt(lastPeriodTo.val()) || Number.parseInt(lastPeriodTo.val()) <= Number.parseInt(lastPeriodFrom.val()))
          {
              Notiflix.Report.Failure("خطا","پایان بازه باید بزرگتر از شروع بازه باشد.","باشه");
          }
          else
          {
             if(countRow > 1)
              document.getElementById('remove-last-period').parentElement.remove();
              lastPeriodTo.attr('disabled',true);
              addNewPeriodRow(countRow,Number.parseInt(lastPeriodTo.val())+1);
          }
        });

        $(document).on('click','#save-period-changes',function()
        {
           storePeriods($(this).attr('data-countRow'),$(this).attr('data-id'));
        });

        $(document).on('focus','input',function(){
          $(this).removeClass('input-error');
        });
    }
