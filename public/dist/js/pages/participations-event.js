if(!participationPageScript)
    {
        participationPageScript = true;

        $(document).on('dblclick','.participation-itemName',function(){
            setItemsSelectOptions(this,$(this).attr('data-product_id'));
        });

        $(document).on('change','.select-participationItem',function(){
                var formData = new FormData();
                formData.append('item_id',$(this).val());
                updateParticipation(formData,$(this).attr('data-id'));
                $(`.participation-itemName[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
        });

        $(document).on('click','.periods',function(){
           loadPeriods($(this).attr('data-id'));
           $('#periods-modal').click();
        });

    }
