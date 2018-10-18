<?php

/* @var $this \yii\web\View */
/* @var $content string */


use yii\helpers\Html;
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <base href="<?= Yii::$app->urlManager->baseUrl ?>/">
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">   
        /* loading    */
        body { 
            background-color: #222;
        }
        ul{
            box-sizing: border-box;
        }
         .bokeh {
            font-size: 100px;
            width: 1em;
            height: 1em;
            position: relative;
            margin: 100px auto;
            border-radius: 50%;
            border: .01em solid rgba(150,150,150,0.1);
            list-style: none;
        }
        .bokeh li {
            position: absolute;
            width: .2em;
            height: .2em;
            border-radius: 50%;
        }
        .bokeh li:nth-child(1) {
            left: 50%;
            top: 0;
            margin: 0 0 0 -.1em;
            background: #00C176;
            -webkit-transform-origin: 50% 250%;
            transform-origin: 50% 250%;
            -webkit-animation: 
                rota 1.13s linear infinite,
                opa 3.67s ease-in-out infinite alternate;
            animation: 
                rota 1.13s linear infinite,
                opa 3.67s ease-in-out infinite alternate;
        }

        .bokeh li:nth-child(2) {
            top: 50%; 
            right: 0;
            margin: -.1em 0 0 0;
            background: #FF003C;
            -webkit-transform-origin: -150% 50%;
            transform-origin: -150% 50%;
            -webkit-animation: 
                rota 1.86s linear infinite,
                opa 4.29s ease-in-out infinite alternate;
            animation: 
                rota 1.86s linear infinite,
                opa 4.29s ease-in-out infinite alternate;
        }

        .bokeh li:nth-child(3) {
            left: 50%; 
            bottom: 0;
            margin: 0 0 0 -.1em;
            background: #FABE28;
            -webkit-transform-origin: 50% -150%;
            transform-origin: 50% -150%;
            -webkit-animation: 
                rota 1.45s linear infinite,
                opa 5.12s ease-in-out infinite alternate;
            animation: 
                rota 1.45s linear infinite,
                opa 5.12s ease-in-out infinite alternate;
        }

         .bokeh li:nth-child(4) {
            top: 50%; 
            left: 0;
            margin: -.1em 0 0 0;
            background: #88C100;
            -webkit-transform-origin: 250% 50%;
            transform-origin: 250% 50%;
            -webkit-animation: 
                rota 1.72s linear infinite,
                opa 5.25s ease-in-out infinite alternate;
            animation: 
                rota 1.72s linear infinite,
                opa 5.25s ease-in-out infinite alternate;
        }

        @-webkit-keyframes rota {
            from { }
            to { -webkit-transform: rotate(360deg); }
        }

        @keyframes rota {
            from { }
            to { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
        }

        @-webkit-keyframes opa {
            0% { }
            12.0% { opacity: 0.80; }
            19.5% { opacity: 0.88; }
            37.2% { opacity: 0.64; }
            40.5% { opacity: 0.52; }
            52.7% { opacity: 0.69; }
            60.2% { opacity: 0.60; }
            66.6% { opacity: 0.52; }
            70.0% { opacity: 0.63; }
            79.9% { opacity: 0.60; }
            84.2% { opacity: 0.75; }
            91.0% { opacity: 0.87; }
        }

        @keyframes opa {
            0% { }
            12.0% { opacity: 0.80; }
            19.5% { opacity: 0.88; }
            37.2% { opacity: 0.64; }
            40.5% { opacity: 0.52; }
            52.7% { opacity: 0.69; }
            60.2% { opacity: 0.60; }
            66.6% { opacity: 0.52; }
            70.0% { opacity: 0.63; }
            79.9% { opacity: 0.60; }
            84.2% { opacity: 0.75; }
            91.0% { opacity: 0.87; }
        }
    </style>
    <!-- <link rel="stylesheet" href="/assets/css/loading.css"> -->
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <!--    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">-->
    <!--    <link href="../node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">-->
    <!--    <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.4/angular-material.min.js"></script>-->
    <!--    <script src="https://ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js"></script>-->
    
</head>
<body class="hold-transition skin-blue">
<?php $this->beginBody() ?>
<timchesara-app>
    <ul class="bokeh">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>           
</timchesara-app>
<step-two></step-two>
<?php $this->endBody() ?>
<script>
var panelSettings = {
    storeName: "<?= Yii::$app->currentStore->model->nameEn ?>",
    storeBaseUrl: "<?= \Yii::$app->urlManagerStore->baseUrl ?>",
    username: "<?= Html::encode(Yii::$app->user->identity->displayName) ?>",
    sidebars: [
        {
            name: 'خانه',
            to: '/home'
        },
        {
            name: 'دسته‌بندی',
            to: '/category'
        },
        {
            name: 'برند',
            to: '/brand'
        },
        {
            name: 'کالا',
            to: '',
            child: [
                {
                    name: 'لیست کالاها',
                    to: '/product'
                },
                {
                    name: 'ایجاد کالای جدید',
                    to: '/product/new'
                },{
                    name: 'ویژگی‌ ها',
                    to: '/product/attribute'
                },{
                    name: 'مقادیر ویژگی‌ها',
                    to: '/product/attributeData'
                }
            ]
        },
        {
            name: 'قیمت',
            to: '/price',
            child: [
                {
                    name: 'لیست قیمت',
                    to: '/price'
                },
                {
                    name: 'کوپن‌های تخفیف',
                    to: '/discount'
                }
            ]
        },
        {
            name: 'سفارشات',
            to: '/order'
        },
        {
            name: 'نما و صفحات فروشگاه',
            to: '/themeplate',
            child: [
                {
                    name: 'انتخاب قالب',
                    to: '/themeplate/select'
                },
                {
                    name: 'تنظیمات قالب',
                    to: '/themeplate/setting'
                },
                {
                    name: 'فیلترهای انتخاب',
                    to: '/setting/filter'
                },
                {
                    name: 'بنرها',
                    to: '/themeplate/banner'
                },
                {
                    name: 'منوها',
                    to: '/themeplate/menu'
                },
                {
                    name: 'صفحات ثابت',
                    to: '/themeplate/pages',
                },
                {
                    name: 'بلاگ',
                    to: '/themeplate/blog',
                },
                {
                    name: 'صفحات ویژه',
                    to: '/themeplate/special',
                }
            ]
        },
        {
            name: 'تنظیمات فروشگاه',
            to: '/setting',
            child: [
                {
                    name: 'مشخصات فروشگاه',
                    to: '/setting'
                },
                {
                    name: 'تنظمات درگاه بانکی',
                    to: '/setting/payment'
                },
                {
                    name: 'کارمندان',
                    to: '/setting/user'
                },
            ]
        },
        {
            name: 'مشتریان',
            to: '/customer'
        },
        {
            name: 'نظرات',
            to: '/comment'
        },
        {
            name: 'پشتیبانی و راهنما',
            to: '/support'
        },
        {
            name: 'طرح اشتراک',
            to: '/plan'
        }
    ]
};
</script>
</body>
</html>
<?php $this->endPage() ?>
