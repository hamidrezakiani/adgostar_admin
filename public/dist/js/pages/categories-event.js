if(!categoryPageScript)
    {
        categoryPageScript = true;
        $(document).on('change','.category-show',function(){
            var formData = new FormData();
            if(this.checked)
              formData.append('show','YES');
            else
              formData.append('show','NO');
            updateCategory(formData,$(this).attr('data-id'));
          });

          $(document).on('dblclick','.category-name',function(){
            if(!$(`.input-name[data-id=${$(this).attr('data-id')}]`).length)
            {

            var input = document.createElement('TEXTAREA');
            input.setAttribute('rows','2');
            input.setAttribute('cols','30');
            input.classList.add('input-category-name');
            input.classList.add('form-control');
            input.setAttribute('data-id',$(this).attr('data-id'));
            input.setAttribute('data-old',$(this).html());
            input.value = $(this).html();
            $(this).html('');
            this.appendChild(input);
            }
          });

          $(document).on('dblclick','.category-label',function(){
              if(!$(`.input-label[data-id=${$(this).attr('data-id')}]`).length)
            {
              var div = document.createElement('DIV');
              var input = document.createElement('TEXTAREA');
              input.setAttribute('rows','2');
              input.setAttribute('cols','30');
              input.classList.add('input-label');
              input.classList.add('form-control');
              input.setAttribute('data-id',$(this).attr('data-id'));
              input.value = $(this).html();
              $(this).html('');
              this.appendChild(input);
            }
            });

            $(document).on('dblclick','.category-parent',function(){
              setParentSelectOptions(this,'select-parent');
            });

            $(document).on('change','.select-parent',function(){
              var formData = new FormData();
              formData.append('parent_id',$(this).val());
              updateCategory(formData,$(this).attr('data-id'));
              $(`.category-parent[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
              $(`.category-parent[data-id=${$(this).attr('data-id')}]`).attr('data-parentId',$(this).val());
            });
            $(document).on('dblclick','.category-show-parent',function(){
                setParentSelectOptions(this,'select-show-parent');
            });

            $(document).on('change','.select-show-parent',function(){
              var formData = new FormData();
              formData.append('showParent_id',$(this).val());
              updateCategory(formData,$(this).attr('data-id'));
              $(`.category-show-parent[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
              $(`.category-show-parent[data-id=${$(this).attr('data-id')}]`).attr('data-showParentId',$(this).val());
            });

          $(document).on('focusout','.input-category-name',function(){
              var formData = new FormData();
              formData.append('name',$(this).val());
              updateCategory(formData,$(this).attr('data-id'));
              $(`.category-name[data-id=${$(this).attr('data-id')}]`).html($(this).attr('data-old'));
              $(this).remove();
          });

          $(document).on('focusout','.input-label',function(){
              var formData = new FormData();
              formData.append('label',$(this).val());
              updateCategory(formData,$(this).attr('data-id'));
              $(`.category-label[data-id=${$(this).attr('data-id')}]`).html($(this).val());
              $(this).remove();
          });
        }
