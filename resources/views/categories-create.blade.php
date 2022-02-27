<html lang="en">
<head>
    <link class="style" rel="stylesheet" href="{{asset('plugins/switch-toggle/switch-toggle.css')}}">
     <style class="style">
         td{
            word-break: break-all;
            text-align: center;
         }
         .input-label{
            font-size: 12px;
         }
         .input-name{
            font-size: 12px;
         }
       th{
           text-align: center;
       }
       .operator{
           padding: 1px,1px,1px,1px;
           font-size: 10px;
           margin: 2px;
       }
       .operator.remove-category
       {
           font-size: 14px;
       }
       .operator.add-subCat
       {
        font-size: 12px;
       }
       .category-operator{
           width: 18%;
       }
       .category-label{
           width: 18%;
           font-size: 14px;
       }
       .category-name{
           width: 18%;
           font-size: 14px;
       }
       .category-parent{
           width: 18%;
           font-size: 14px;
       }
       .category-details{
           width: 12%;
           font-size: 12px;
       }

       .category-show-parent{
           width: 18%;
           font-size: 14px;
       }
       .breadcrumb-item a{
          color: inherit;
          cursor: pointer;
       }
       .breadcrumb-item.active a{
           color: blueviolet;
       }
       #add-subCat-name{
           text-decoration: underline;
           color:chartreuse;
           cursor: pointer;
       }
     </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row" id="create-category">
            <div class="col-md-2 col-lg-3 col-sm-1"></div>
            <div class="col-md-8 col-lg-6 col-sm-10"><!-- general form elements -->
              <div class="card card-primary">
                  <div class="card-header">
                  <h3 class="card-title">ساخت دسته جدید : <a id="add-subCat-name"></a></h3>
                </div>
                <!-- /.card-header -->
                  <div class="card-body">
                    <div class="form-group">
                        <div class="form-group">
                        <label>نام</label>
                        <input id="form-category-name" type="text" class="form-control" placeholder="نام دسته را وارد کنید ...">
                        <label id="name" class="control-label text-danger errors" for="form-category-name"><i class="fa fa-times-circle-o"></i></label>
                        </div>
                        <div class="form-group">
                        <label>برچسب</label>
                        <input id="form-category-label" type="text" class="form-control" placeholder="برچسب را وارد کنید ...">
                        <label id="label" class="control-label text-danger errors" for="form-category-label"><i class="fa fa-times-circle-o"></i></label>
                        </div>
                        <div class="form-group">
                            <label>دسته</label>
                            <select id="form-category-parent" class="form-control select2" name="parent" style="width: 100%;">
                            </select>
                        </div>
                        <div class="form-group">
                        <label>دسته نمایشی</label>
                        <select id="form-category-showParent" class="form-control select2" name="showParent" style="width: 100%;">
                        </select>
                        </div>
                    </div>
                      <!-- /.form-group -->
                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                    <button id="btn-create-category" class="btn btn-primary">ارسال</button>
                  </div> </div>
            </div>
            <div class="col-md-2 col-lg-3 col-sm-1""></div>
        </div>
      </div><!-- /.container-fluid -->
    <script class="script">
      var pageParentId = '{{$parent}}';
      var pageFlag = '{{$flag}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/categories-create.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/categories-create-event.js')}}"></script>
</body>
</html>


