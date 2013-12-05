<?php
  class DB{
		private static $dbname = 'timeline';
		private static $dbhost = 'localhost';
		private static $dbuser = 'root';
		private static $dbpass = 'pass';

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
