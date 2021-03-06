<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb946e9eb67c437b756f415ee6a56e656
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'Automattic\\WooCommerce\\' => 23,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Automattic\\WooCommerce\\' => 
        array (
            0 => __DIR__ . '/..' . '/automattic/woocommerce/src/WooCommerce',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb946e9eb67c437b756f415ee6a56e656::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb946e9eb67c437b756f415ee6a56e656::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
