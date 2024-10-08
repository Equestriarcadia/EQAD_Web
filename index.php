<?php
include("./includes/common.php");
function get_curl($url, $post = 0, $referer = 0, $cookie = 0, $header = 0, $ua = 0, $nobaody = 0)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $klsf[] = "Accept:*/*";
    $klsf[] = "Accept-Encoding:gzip,deflate,sdch";
    $klsf[] = "Accept-Language:zh-CN,zh;q=0.8";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $klsf);
    if ($post) {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    }
    if ($header) {
        curl_setopt($ch, CURLOPT_HEADER, TRUE);
    }
    if ($cookie) {
        curl_setopt($ch, CURLOPT_COOKIE, $cookie);
    }
    if ($referer) {
        if ($referer == 1) {
            curl_setopt($ch, CURLOPT_REFERER, "http://m.qzone.com/infocenter?g_f=");
        } else {
            curl_setopt($ch, CURLOPT_REFERER, $referer);
        }
    }
    if ($ua) {
        curl_setopt($ch, CURLOPT_USERAGENT, $ua);
    } else {
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Linux; U; Android 4.0.4; es-mx; HTC_One_X Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0');
    }
    if ($nobaody) {
        curl_setopt($ch, CURLOPT_NOBODY, 1);//主要头部
        //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);//跟随重定向
    }
    curl_setopt($ch, CURLOPT_ENCODING, "gzip");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $ret = curl_exec($ch);
    curl_close($ch);
    return $ret;
}
function get_curl_self($url, $post = 0)
{
    $ch = curl_init();
	$urlarr = parse_url($url);
	if($urlarr['host']==$_SERVER['HTTP_HOST'] && !ini_get('acl.app_id')){
		$url=str_replace('http://'.$_SERVER['HTTP_HOST'].'/','http://127.0.0.1:80/',$url);
		$url=str_replace('https://'.$_SERVER['HTTP_HOST'].'/','https://127.0.0.1:443/',$url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Host: '.$_SERVER['HTTP_HOST']));
	}
    curl_setopt($ch, CURLOPT_URL, $url);
	if ($post) {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    }
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $ret = curl_exec($ch);
    curl_close($ch);
    return $ret;
}
?>
<!doctype html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <title>
        <?php echo $conf['sitename']; ?>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="<?php echo $conf['keywords']; ?>">
    <meta name="description" content="<?php echo $conf['description']; ?>">
    <link rel="stylesheet" href="static/css/normalize.css">
    <link rel="stylesheet" href="static/css/style.css">
    <link rel="stylesheet" href="static/css/featherlight.min.css">
    <link href='https://fonts.googleapis.com/css?family=Arimo:400,700' rel='stylesheet' type='text/css'>

    <script src="static/js/jquery-latest.min.js"></script>
    <script type="text/javascript" src="static/js/featherlight.min.js"></script>
    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?39c17960d88eb930ff267b4402b1ad92";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

</head>

<body>
    <header id="top">
        <div class="wrapper">
            <h1 class="logo"><a href="#">LOGO</a></h1>
            <nav>
                <ul id="navigation">
                    <li><a href="<?php echo $conf['dh1dz']; ?>">
                            <?php echo $conf['dh1']; ?>
                        </a></li>
                    <li><a href="<?php echo $conf['dh2dz']; ?>">
                            <?php echo $conf['dh2']; ?>
                        </a></li>
                    <li><a href="<?php echo $conf['dh3dz']; ?>">
                            <?php echo $conf['dh3']; ?>
                        </a></li>
                    <li><a href="<?php echo $conf['dh4dz']; ?>">
                            <?php echo $conf['dh4']; ?>
                        </a></li>
                    <li><a href="<?php echo $conf['dh5dz']; ?>">
                            <?php echo $conf['dh5']; ?>
                        </a></li>
                    <li><a class="nav-cta" href="<?php echo $conf['jq']; ?>">进入交流群</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <section id="banner"><a name="home"></a>
        <div class="wrapper">
            <h2>
                <?php echo $conf['server']; ?>
            </h2>
            <p class="subtitle">
                <?php echo $conf['jianjie']; ?>
            </p>
            <div class="buttons">
                <a href="<?php echo $conf['khd']; ?>" class="button-1">下载客户端</a>
                <a href="<?php echo $conf['jq']; ?>" class="button-2">进入交流群</a>
            </div>
        </div>
    </section>

    <section class="video-section">
        <div class="wrapper">
            <h3>服务器宣传片</h3>
            <p class="subtitle">
                <?php echo $conf['spjianjie']; ?>
            </p>
            <video width="790" src="<?php echo $conf['xcp']; ?>" poster="<?php echo $conf['xcptu']; ?>"
                onclick="this.play();" controls preload>
            </video>
        </div>
    </section>

    <section class="services-section"><a name="services"></a>
        <div class="wrapper">
            <h3>服务器特色</h3>
            <ul class="services-list">
                <li>
                    <div class="image-container">
                        <img src="<?php echo $conf['tesetu1']; ?>" alt="services icon">
                    </div>
                    <h5>
                        <?php echo $conf['tese1']; ?>
                    </h5>
                    <p>
                        <?php echo $conf['tesejianjie1']; ?>
                    </p>
                </li>
                <li>
                    <div class="image-container">
                        <img src="<?php echo $conf['tesetu2']; ?>" alt="services icon">
                    </div>
                    <h5>
                        <?php echo $conf['tese2']; ?>
                    </h5>
                    <p>
                        <?php echo $conf['tesejianjie2']; ?>
                    </p>
                </li>
                <li>
                    <div class="image-container">
                        <img src="<?php echo $conf['tesetu3']; ?>" alt="services icon">
                    </div>
                    <h5>
                        <?php echo $conf['tese3']; ?>
                    </h5>
                    <p>
                        <?php echo $conf['tesejianjie3']; ?>
                    </p>
                </li>
                <div class="clear"></div>
            </ul>
        </div>
    </section>


    <section class="team-section"><a name="about"></a>
        <div class="wrapper">
            <h3>团队成员</h3>
            <ul class="team-list">
                <li>
                    <div class="image-container">
                        <img src="<?php echo $conf['tuanduitu1']; ?>" alt="team member">
                    </div>
                    <h5>
                        <?php echo $conf['tuandui1']; ?>
                    </h5>
                    <p>
                        <?php echo $conf['tuanduijianjie1']; ?>
                    </p>
                </li>
                <li>
                    <div class="image-container">
                        <img src="<?php echo $conf['tuanduitu2']; ?>" alt="team member">
                    </div>
                    <h5>
                        <?php echo $conf['tuandui2']; ?>
                    </h5>
                    <p>
                        <?php echo $conf['tuanduijianjie2']; ?>
                    </p>
                </li>
                <li>
                    <div class="image-container">
                        <img src="<?php echo $conf['tuanduitu3']; ?>" alt="team member">
                    </div>
                    <h5>
                        <?php echo $conf['tuandui3']; ?>
                    </h5>
                    <p>
                        <?php echo $conf['tuanduijianjie3']; ?>
                    </p>
                </li>
                <div class="clear"></div>
            </ul>
        </div>
    </section>

    <section class="portfolio-section"><a name="portfolio"></a>
        <h3>优质图片展示</h3>
        <ul class="portfolio-list">
            <li class="item">
                <a href="<?php echo $conf['tp1']; ?>" data-featherlight="<?php echo $conf['tp1']; ?>"
                    class="photo-overlay">
                    <img src="<?php echo $conf['tp1']; ?>" alt="" />
                </a>
            </li>
            <li class="item">
                <a href="<?php echo $conf['tp2']; ?>" data-featherlight="<?php echo $conf['tp2']; ?>"
                    class="photo-overlay">
                    <img src="<?php echo $conf['tp2']; ?>" alt="" />
                </a>
            </li>
            <li class="item">
                <a href="<?php echo $conf['tp3']; ?>" data-featherlight="<?php echo $conf['tp3']; ?>"
                    class="photo-overlay">
                    <img src="<?php echo $conf['tp3']; ?>" alt="" />
                </a>
            </li>
            <li class="item">
                <a href="<?php echo $conf['tp4']; ?>" data-featherlight="<?php echo $conf['tp4']; ?>"
                    class="photo-overlay">
                    <img src="<?php echo $conf['tp4']; ?>" alt="" />
                </a>
            </li>
            <li class="item">
                <a href="<?php echo $conf['tp5']; ?>" data-featherlight="<?php echo $conf['tp5']; ?>"
                    class="photo-overlay">
                    <img src="<?php echo $conf['tp5']; ?>" alt="" />
                </a>
            </li>
            <li class="item">
                <a href="<?php echo $conf['tp6']; ?>" data-featherlight="<?php echo $conf['tp6']; ?>"
                    class="photo-overlay">
                    <img src="<?php echo $conf['tp6']; ?>" alt="" />
                </a>
            </li>
            <div class="clear"></div>
        </ul>
    </section>

    <footer>
        <div class="wrapper">
            <a class="logo" href="#">LOGO</a>
            <div class="footer-left">
                <p class="copyright">Copyright &copy; <?=date("Y")?>
                    <?php echo $conf['server']; ?> All rights reserved
                </p>
                <p><?php echo $conf['icp']; ?></p>
                <p><?php echo $conf['ga']; ?></p>
                <p><?php echo $conf['copy']; ?></p>
                <p clas="footer-links"> "Minecraft"以及"我的世界"为美国微软公司的商标 本站与微软公司没有从属关系</a></p>
            </div>
            <div class="clear"></div>
        </div>
    </footer>
    <!-- music  -->
    <audio autoplay="autoplay">

        <source src="<?php echo $conf['music']; ?>" type="audio/mpeg">
        </source>
    </audio>
</body>

</html>