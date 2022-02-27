<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img id="sidebar-logo" src="http://127.0.0.1:8000/media/images/representation/setting/load.gif" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">پنل سوپر ادمین ادگستر</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar" style="direction: ltr">
      <div style="direction: rtl">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img id="avatar" src="http://127.0.0.1:8000/media/images/representation/setting/load.gif" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <a href="#" id="user-name" class="d-block">دریافت اطلاغات....</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item has-treeview" id="group-category-menu-open">
                <a id="group-category-sidebar" class="nav-link">
                  <i class="nav-icon fa fa-tree"></i>
                  <p>
                    دسته بندی ها
                    <i class="fa fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a data-url='/categories-create' id="create-category-sidebar" class="nav-link page-links">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>سر دسته جدید</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a data-url='/categories' id="list-category-sidebar" class="nav-link page-links">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>لیست دسته ها</p>
                    </a>
                  </li>
                </ul>
            </li>
            <li class="nav-item has-treeview" id="group-product-menu-open">
                <a id="group-product-sidebar" class="nav-link">
                  <i class="nav-icon fa fa-tree"></i>
                  <p>
                    محصولات
                    <i class="fa fa-angle-left right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a data-url='/products-create' id="create-product-sidebar" class="nav-link page-links">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>محصول جدید</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a data-url='/products' id="list-product-sidebar" class="nav-link page-links">
                      <i class="fa fa-circle-o nav-icon"></i>
                      <p>لیست محصولات</p>
                    </a>
                  </li>
                </ul>
            </li>
             <li class="nav-item" id="group-participation-menu-open">
                <a id="group-participation-sidebar" data-url='/participations' class="nav-link page-links">
                  <i class="nav-icon fa fa-tree"></i>
                  <p>
                    مشارکت ها
                  </p>
                </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
    </div>
    <!-- /.sidebar -->
  </aside>
