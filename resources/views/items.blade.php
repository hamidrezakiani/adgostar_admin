<html lang="en">
<head>
    <link class="style" rel="stylesheet" href="{{asset('plugins/switch-toggle/switch-toggle.css')}}">
     <style class="style">
          input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield !important;
  font-size: 13px;
}
.input-error{
    background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(255,156,186,1) 0%);
}
         td{
            word-break: break-all;
            text-align: center;
         }
       th{
           text-align: center;
       }
       .operator{
           padding: 1px,1px,1px,1px;
           font-size: 10px;
           margin: 2px;
       }

       .breadcrumb-item a{
          color: inherit;
          cursor: pointer;
       }
       .breadcrumb-item.active a{
           color: blueviolet;
       }

       #exampleModalLong{
           z-index: 1300 !important;
       }

       #executer-periods-detail{
           margin-top: 6px;
       }
       #executer-periods-detail span{
           display: block;
           margin-bottom: 5px;
       }

       #period-create-detail{
           margin-top: 6px;
       }
       #period-create-detail span{
           display: block;
           margin-bottom: 10px;
       }
       #period-create-detail button{
           float: left;
           margin-right: 2px;
       }
       .input-group.input-group-prepend span{
           font-size: 12px;
       }
     </style>
</head>
<body>
    <button type="button" id="periods-modal" style="display:none" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
  Launch demo modal
</button>
    <div class="container-fluid">
        <div class="modal fade bd-example-modal-lg" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="exampleModalLongTitle">بازه ها</h6>
              </div>
              <div class="modal-body">
                <div class="row">
                    <div class="card col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <p id="executer-periods-detail">
                            <span id="title">بازه های مجزی</span>
                        </p>
                        <div class="card-body table-responsive p-0">
                  <table  class="table table-hover" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th>َشروع</th>
                            <th>پایان</th>
                            <th>قیمت</th>
                          </tr>
                    </thead>
                    <tbody id="executer-period-table">

                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
                    </div>
                    <div class="card col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <p id="period-create-detail">
                            <span>تعریف بازه</span>
                            <button id="remove-all-periods" class="btn btn-danger">پاک کردن بازه ها</button>
                            <button id="refresh-item-periods" class="btn btn-info fa fa-refresh"></button>
                        </p>
                        <div id="periods" class="form-group">

                        </div>
                        <div class="form-group">
                           <button class="btn btn-primary fa fa-plus" id="add-new-period"></button>
                        </div>
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">بستن</button>
                <button type="button" class="btn btn-success mr-2" id="save-period-changes">ذخیره تغییرات</button>
            </div>
            </div>
          </div>
        </div>
        <div class="row" id="categories">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">آیتم ها</h3>
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                        <div class="input-group-append">
                            <button data-url='/products-create' class="btn btn-success page-links">افزودن محصول</button>
                        </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table  class="table table-hover">
                    <thead>
                        <tr>
                            {{-- <th>ردیف</th> --}}
                            <th>نام آینم</th>
                            <th>نام محصول</th>
                            <th>وضعیت انتشار</th>
                            <th>عملیات</th>
                          </tr>
                    </thead>
                    <tbody id="item-table">

                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
    <script class="script">
      var pageProductId = '{{$product_id}}';
      var pageFlag = '{{$flag}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/items.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/items-event.js')}}"></script>
</body>
</html>


