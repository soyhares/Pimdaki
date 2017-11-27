
<?php
function etiqueta_final($parser, $name) {
    global $info,$datos,$contador;
    $info[$name][] = $datos;
}
function extractor_datos($parser,$data){
                global $datos;
                $datos = $data;
}
function extractor_datos_tags($parser,$data){
                global $datos;
                $datos .= $data;
}
function parser_extractor($cadena,$tags=true){
                 
    // Definiendo variables 
    global $info,$datos,$contador;
    $info = array();
    $datos = "";
    $contador = 0;
 
    // Creando el parser
    $xml_parser = xml_parser_create();
 
    // Definiendo la funciones controladoras
    xml_set_character_data_handler($xml_parser,($tags?"extractor_datos":"extractor_datos_tags"));
    xml_set_element_handler($xml_parser, "", "etiqueta_final");
     
    // Procesando el archivo
    if (!xml_parse($xml_parser, $cadena)) {
        die(sprintf("XML error: %s at line %d",
        xml_error_string(xml_get_error_code($xml_parser)),
        xml_get_current_line_number($xml_parser)));
    }
     
    // Liberando recursos
    xml_parser_free($xml_parser); 
    return $info;
}
 
 
/*
La siguiente Funcion debe recibir por parametro la fecha en formato dd/mm/YYYY
*/
function tipo_cambio($fecha){
    // Rutas de los archivos XML con el tipo de cambio
    $file["compra"] = "http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicosXML?tcIndicador=317&tcFechaInicio=$fecha&tcFechaFinal=$fecha&tcNombre=dmm&tnSubNiveles=N"; // Archivo XML 
    $file["venta"] = "http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicosXML?tcIndicador=318&tcFechaInicio=$fecha&tcFechaFinal=$fecha&tcNombre=dmm&tnSubNiveles=N"; // Archivo XML 
     
    // Extrae el tipo cambio con el valor de COMPRA
    $data_file = file_get_contents($file["compra"]);
    $ainfo = parser_extractor($data_file,false);
    $fuente = parser_extractor($ainfo["STRING"][0]);
    $tipo["compra"] = $fuente["NUM_VALOR"][0];
     
    // Extrae el tipo cambio con el valor de VENTA
    $data_file = file_get_contents($file["venta"]);
    $ainfo = parser_extractor($data_file,false);
    $fuente = parser_extractor($ainfo["STRING"][0]);
    $tipo["venta"] = $fuente["NUM_VALOR"][0];
     
    // Retornando valor de compra y venta del dolar
    if ( $tipo["compra"] == "" or $tipo["venta"] == "" ){
        return false;
    }else{
        return $tipo;
    }
 
}
 
$fecha = date('d/m/Y');
$valor = tipo_cambio($fecha);
 
?>

<!DOCTYPE html>
<html lang="es">
  <head>

    <!-- SITE TITTLE -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pindaki | Revisión</title>

    <!-- PLUGINS CSS STYLE -->
    <link href="plugins/jquery-ui/jquery-ui.css" rel="stylesheet">
    <link href="plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="plugins/selectbox/select_option1.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="plugins/rs-plugin/css/settings.css" media="screen">
    <link rel="stylesheet" type="text/css" href="plugins/owl-carousel/owl.carousel.css" media="screen">

    <!-- GOOGLE FONT -->
    <link href='https://fonts.googleapis.com/css?family=Oxygen:400,300,700' rel='stylesheet' type='text/css'>

    <!-- CUSTOM CSS -->
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="css/default.css" id="option_color">

    <!-- Icons -->
    <link rel="shortcut icon" href="img/favicon.png">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

  </head>

  <body class="body-wrapper">
   <!-- *********************** coninChange ****************************************-->
  <input id="coinChange" type="text" style="display:none;" value=<?php echo $valor['venta']?>/>
  <!-- ************************************************************************* -->
    
<!-- MODAL-->
    <div class="modal animated bounceIn" id="warning" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header modal-header-warning">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 class="header-text"><i class="fa fa-exclamation-triangle pos-i"></i> ¿Deseas eliminar este artículo?</h3>

                </div>
                <div id="warningModal" class="modal-body">
                  <div  class="media">
                    <a id="delete-img" class="pull-left pull-width">
                        <!-- <img src="http://placehold.it/180x200/456" class="media-object" alt="Sample Image"> -->
                    </a>
                    <div id="delete-body" class="media-body">
                      <!-- <h1 class="media-heading">Bootstrap thumbnail example</h1>
                        <h4>Using the .media and .media-body built-in classes</h4>
                      <h4>Simple trick, just apply pull-left to the image</h4> -->
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning pull-left" data-dismiss="modal">Cancelar </button>
                    <button type="button" class="btn btn-danger pull-right" onclick="deleteProductInCart();">Eliminar </button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="main-wrapper">

      <!-- HEADER -->
      <div class="header clearfix">

        <!-- TOPBAR -->
        <div class="topBar">
          <div class="container">
            <div class="row">
              <div class="col-md-6 col-sm-5 hidden-xs">
                <ul class="list-inline">
                  <!-- <li><a href="#"><i class="fa fa-twitter"></i></a></li> -->
                  <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                  <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                  <!-- <li><a href="#"><i class="fa fa-vimeo"></i></a></li>
                  <li><a href="#"><i class="fa fa-tumblr"></i></a></li> -->
                </ul>
              </div>
              <!-- <div class="col-md-6 col-sm-7 col-xs-12">
                <ul class="list-inline pull-right top-right">
                  <li class="account-login"><span><a data-toggle="modal" href='.login-modal'>Ingresar</a><small>ó</small><a data-toggle="modal" href='#signup'>Registrarse</a></span></li>
                  <li class="searchBox">
                    <a href="#"><i class="fa fa-search"></i></a>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <span class="input-group">
                          <input type="text" class="form-control" placeholder="Buscar.." aria-describedby="basic-addon2">
                          <button type="submit" class="input-group-addon">Buscar</button>
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown cart-dropdown">
                    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-shopping-cart"></i>₡00</a>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>Carrito</li>
                      <li>
                        <a href="single-product.html">
                          <div class="media">
                            <img class="media-left media-object" src="img/home/cart-items/cart-item-01.jpg" alt="cart-Image">
                            <div class="media-body">
                              <h5 class="media-heading">INCIDIDUNT UT <br><span>2 X $199</span></h5>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="single-product.html">
                          <div class="media">
                            <img class="media-left media-object" src="img/home/cart-items/cart-item-01.jpg" alt="cart-Image">
                            <div class="media-body">
                              <h5 class="media-heading">INCIDIDUNT UT <br><span>2 X $199</span></h5>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <div class="btn-group" role="group" aria-label="...">
                          <button type="button" class="btn btn-default" onclick="location.href='cart-page.html';">Mi Carrito</button>
                          <button type="button" class="btn btn-default" onclick="location.href='checkout-step-1.html';">Revisión</button>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div> -->
            </div>
          </div>
        </div>

        <!-- NAVBAR -->
        <nav class="navbar navbar-main navbar-default" role="navigation">
          <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="index.html"><img src="img/pindaki.jpg" alt="logo"></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
              <ul class="nav navbar-nav">
                <li class="dropdown active">
                  <a href="index.html">Inicio</a>
                </li>
                <li class="dropdown">
                  <a href="product-grid-left-sidebar.html">Catálogo</b></a>
                </li>
                <li class="dropdown">
                  <a href="blog-fullwidth.html">Tienda Física</a>
                </li>
                <!-- <li class="dropdown">
                  <a href="account-profile.html">Membresía</a>
                </li> -->
                <!-- <li class="dropdown">
                  <a href="account-profile.html">Mi perfil</a>
                </li> -->
              </ul>
            </div><!-- /.navbar-collapse -->
          </div>
        </nav>
      </div>

      <!-- LIGHT SECTION -->
      <section class="lightSection clearfix pageHeader">
        <div class="container">
          <div class="row">
            <div class="col-xs-6">
              <div class="page-title">
                <h2>Revisión</h2>
              </div>
            </div>
            <div class="col-xs-6">
              <ol class="breadcrumb pull-right">
                <li>
                  <a href="index.html">Inicio</a>
                </li>
                <li class="active">Revisión</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- MAIN CONTENT SECTION -->
      <section class="mainContent clearfix stepsWrapper">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <div class="innerWrapper clearfix stepsPage">
                <div class="row progress-wizard" style="border-bottom:0;">

                  <div class="col-xs-3 progress-wizard-step complete fullBar">
                    <div class="text-center progress-wizard-stepnum">Información de compra</div>
                    <div class="progress"><div class="progress-bar"></div></div>
                    <a href="checkout-step-1.html" class="progress-wizard-dot"></a>
                  </div>

                  <div class="col-xs-3 progress-wizard-step complete fullBar">
                    <div class="text-center progress-wizard-stepnum">Opciones de envío</div>
                    <div class="progress"><div class="progress-bar"></div></div>
                    <a href="checkout-step-2.html" class="progress-wizard-dot"></a>
                  </div>

                  <div class="col-xs-3 progress-wizard-step active">
                    <div class="text-center progress-wizard-stepnum">Revisión</div>
                    <div class="progress"><div class="progress-bar"></div></div>
                    <a href="checkout-step-3.php" class="progress-wizard-dot"></a>
                  </div>

                  <div class="col-xs-3 progress-wizard-step disabled">
                    <div class="text-center progress-wizard-stepnum">Opciones de pago</div>
                    <div class="progress"><div class="progress-bar"></div></div>
                    <a  class="progress-wizard-dot"></a>
                  </div>
                </div>

                <form action="" class="row" method="POST" role="form">
                  <div class="col-xs-12">
                    <div class="page-header">
                      <h4>Revisión de la orden</h4>
                    </div>
                  </div>
                  <div class="col-sm-6 col-xs-12">
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">Información de Compra</h4>
                      </div>
                      <div class="panel-body">
                        <address id="info_compra">
                          <!-- <h5>Cliente: Hanz Fernández</h5>
                          <h5>Correo: fernandezhanz@gmail.com</h5>
                          <h5>Teléfono: 83235209</h5>
                          <h5>Membresía: No registrado</h5> -->
                        </address>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 col-xs-12">
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">Dirección de Envío</h4>
                      </div>
                      <div class="panel-body">
                        <address id="info_envío">
                          <!-- <h5>País: Costa Rica</h5>
                          <h5>Provincia: Heredia</h5>
                          <h5>Dirección: San Rafel, Calle Puente Piedra</h5>
                          <h5>Código Postal: 42314</h5> -->
                        </address>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12">
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">Detalles del Envío</h4>
                      </div>
                      <div class="panel-body">
                        <div class="row">
                          <div class="col-sm-4 col-xs-12">
                            <address id="compañía_envío">
                              <!-- <span>Compañía: Correos de Costa Rica</span> <br>
                              <span>Precio: ₡1500</span> <br> -->
                              <!-- <span>Contacto: +506 2502-4567</span> -->
                            </address>
                          </div>
                          <div class="col-sm-8 col-xs-12">
                            <address id="info_importante">
                              <span>Información Importante: </span><br>
                              <p>Si los artículos adquiridos poseen algún defecto de manufactura, fueron manipulados o difieren de los que has solicitado, no dudes en contactarnos por cualquiera de los siguientes medios: 
                              - WhatsApp: (+506) 8777-9777 
                              - Oficina: (+506) 2262-6777
                              - Correo: info@pindaki.com

                              ¡Estamos siempre a tu servicio!.
                            </p>
                            </address>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12">
                    <div class="cartListInner">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Producto</th>
                              <th>Código</th>
                              <th>Cantidad</th>
                              <th>Precio</th>
                            </tr>
                          </thead>
                          <tbody id="tbody_cart">
                            <!-- LOAD DINAMICALLY -->
                          </tbody>
                        </table>
                      </div>
                      <div class="row totalAmountArea">
                        <div class="col-sm-4 col-sm-offset-8 col-xs-12">
                          <ul class="list-unstyled">
                            <li id="Subtotal">Subtotal</li>
                            <!-- <li id="Descuento">Descuento</li> -->
                            <li id="Total">Total</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12">
                    <div class="well well-lg clearfix">
                      <ul class="pager">
                      <li class="previous"><a href="checkout-step-2.html">Volver</a></li>
                        <li class="next"><a href="checkout-step-4.html">Confirmar</a></li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <div class="footer clearfix">
        <div class="container">
          <div class="row">
            <div class="col-sm-2 col-xs-12">
              <div class="footerLink">
                <h5>Términos de Uso</h5>
                <ul class="list-unstyled">
                  <li><a href="terms-and-conditions.html">Términos y Condiciones</a></li>
                  <li><img class="ftcorreos" src="img/home/footer/ftcorreos.png"></li>
                  <li><img class="fttodoexpress" src="img/home/footer/fttodoexpress.png"></li>
                </ul>
              </div>
            </div>
            <div class="col-sm-2 col-xs-12">
              <div class="footerLink">
                <h5>Redes Sociales</h5>
                <ul class="list-inline">
                  <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                  <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                  <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                  <li><a href="#"><i class="fa fa-instagram"></i></a></li>  
                </ul>
              </div>
            </div>
            <div class="col-sm-2 col-xs-12">
              <!-- <div class="footerLink">
                <h5>Tecnología</h5>
                <ul class="list-unstyled">
                  <li><a href="#">Móviles </a></li>
                  <li><a href="#">Computadoras </a></li>
                  <li><a href="#">Tablets </a></li>
                </ul>
              </div> -->
            </div>
            <div class="col-sm-2 col-xs-12">
              <div class="footerLink">
                <h5>Contacto</h5>
                <ul class="list-unstyled">
                  <li><i class="fa fa-phone" aria-hidden="true"> </i> (+506) 2262-5777</li>
                  <li><i class="fa fa-whatsapp" aria-hidden="true"> </i> (+506) 8777-7797</li>
                  <li><i class="fa fa-envelope-o" aria-hidden="true"> </i> <a href="mailto:info@pindaki.com"> info@pindaki.com</a></li>
                  <li><i class="fa fa-inbox" aria-hidden="true"> </i> 67-40901</a></li>

                </ul>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12">
              <div class="newsletter clearfix">
                <h3>Suscribirse</h3>
                <p>Ingresa tu correo para recibir promociones especiales.</p>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Correo Electrónico..." aria-describedby="basic-addon2">
                  <a href="#" class="input-group-addon" id="basic-addon2">Ir <i class="glyphicon glyphicon-chevron-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- COPY RIGHT -->
      <div class="copyRight clearfix">
        <div class="container">
          <div class="row">
            <div class="col-sm-7 col-xs-12">
              <p>&copy; 2017 Copyright Portafolio AM Siete S.A  <a target="_blank" href="https://www.portafolioam7.com/">Visitar</a>.</p>
            </div>
            <div class="col-sm-5 col-xs-12">
              <ul class="list-inline">
                <li><img src="img/home/footer/card1.png"></li>
                <li><img src="img/home/footer/card2.png"></li>
                <li><img src="img/home/footer/card3.png"></li>
                <!-- <li><img src="img/home/footer/card4.png"></li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LOGIN MODAL -->
    <div class="modal fade login-modal" id="login" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3 class="modal-title">Ingresar</h3>
          </div>
          <div class="modal-body">
              <div class="col-sm-12">
                <div class="page-header text-center">
                  <h3>Redes Sociales</h3>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="form-group col-sm-12 col-xs-12">
                <button type="submit" onclick="loginWithFacebook()" class="btn-block btn-social btn-facebook-filled"><i class="fa fa-facebook" aria-hidden="true"></i><span>Ingresar con Facebook</span></button>
              </div>
              <div class="form-group col-sm-12 col-xs-12">
                <button type="submit" onclick="loginWithGoogle()" class="btn-block btn-social btn-google-filled"><i class="fa fa-google-plus" aria-hidden="true"></i><span>Ingresar con Google+</span></button>
              </div>
              <div class="clearfix"></div>
              <div class="col-sm-12">
                <div class="page-header text-center">
                  <h3>Cuenta PDK</h3>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="form-group">
                <label for="">Correo Electrónico</label>
                <input type="email" class="form-control" id="logmail">
              </div>
              <div class="form-group">
                <label for="">Contraseña</label>
                <input type="password" class="form-control" id="logpass">
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox" checked="true"> Recordarme
                </label>
              </div>
              <button onclick="loginWithEmailAndPassword()" class="btn btn-primary btn-block">Ingresar</button>
              <button type="button" class="btn btn-link btn-block">¿Ovidaste la contraseña?</button>
          </div>
        </div>
      </div>
    </div>

    <!-- SIGN UP MODAL -->
    <div class="modal fade signup-modal" id="signup" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3 class="modal-title">Crear cuenta</h3>
          </div>
          <div class="modal-body">
              <div class="col-sm-12">
                <div class="page-header text-center">
                  <h3>Registro PinDaKi</h3>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="form-group">
                <label for="">Nombre</label>
                <input type="text" class="form-control" id="name">
              </div>
              <div class="form-group">
                <label for="">Apellidos</label>
                <input type="text" class="form-control" id="lastName">
              </div>
              <div class="form-group">
                <label for="">Correo Electrónico</label>
                <input type="email" class="form-control" id="email">
              </div>
              <div class="form-group">
                <label for="">Contraseña</label>
                <input type="password" class="form-control" id="password">
              </div>
              <div class="form-group">
                <label for="">Repetir Contraseña</label>
                <input type="password" class="form-control" id="repassword">
              </div>
              <button onclick="createUserWithEmailAndPassword();" class="btn btn-primary btn-block">Registro</button>
          </div>
        </div>
      </div>
    </div>

    <!-- LOGOUT MODAL -->
    <div class="modal fade logout-modal" id="logout" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3 class="modal-title">¡Bienvenido!</h3>
          </div>
          <div class="modal-body">
              <div class="col-sm-12">
                <div id="eleOfBody" class="text-center">
                  <!-- <img class="img-circle" src="img/huevoP.jpg">
                  <h3>Hanz Fernández</h3> -->
                  <!-- <span>Te recomedamos continuar con tu sesión activa. Esto te ayudará a mantenerte al día con las mejores promociones, productos de alta calidad, y las mejores marcas.</span> -->
                  <div class="clearfix"></div>
                </div>
              </div>
              <div class="clearfix"></div>
              <button onclick="logOutUser()" class="btn btn-primary btn-block">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>

    <!-- PORDUCT QUICK VIEW MODAL -->
    <div id="quick-modal" class="modal fade quick-view" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <div class="media">
              <div id="img-modal" class="media-left">
                <!-- DINAMICALLY LOAD DATA -->
              </div>
              <div id="modal-data" class="media-body">
                <!-- DINAMICALLY SHOW THE DATA -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="https://www.paypalobjects.com/api/checkout.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="plugins/jquery-ui/jquery-ui.js"></script>
    <script src="plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="plugins/rs-plugin/js/jquery.themepunch.tools.min.js"></script>
    <script src="plugins/rs-plugin/js/jquery.themepunch.revolution.min.js"></script>
    <script src="plugins/owl-carousel/owl.carousel.js"></script>
    <script src="plugins/selectbox/jquery.selectbox-0.1.3.min.js"></script>
    <script src="plugins/countdown/jquery.syotimer.js"></script>
    <script src="js/step3.js"></script>
    <script src="js/custom.js"></script>

  </body>
</html>
