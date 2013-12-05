<?php
  class DB{
		private static $dbname = 'tl';
		private static $dbhost = '0.0.0.0';
		private static $dbuser = 'root';
		private static $dbpass = '';

		private static $conn = null;

		public function __construct(){die("Static Class");}
		public static function connect(){
			if(self::$conn == null){
				try{
					self::$conn = new PDO("mysql:host=".self::$dbhost.";dbname=".self::$dbname,self::$dbuser,self::$dbpass);
				}
				catch(PDOException $e){
					die($e->getMessage());
				}
			}
			return self::$conn;
		}

		public static function disconnect(){
			self::$conn = null;
		}
	}
?>
