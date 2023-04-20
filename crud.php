<?php
    class JsonFunctions{
        private $jsonFile = "database.json";
        
        //method show data about the user
        public function readRecords(){
            if(file_exists($this->jsonFile)){
                $jsonData = file_get_contents($this->jsonFile);
                $users = json_decode($jsonData, true);
                return !empty($users)?$users:false;
            }
        }

        //method update data about the user
        public function updateRecord($updateUser, $login){
            if(!empty($updateUser) && is_array($updateUser) && !empty($login)){
                $jsonData = file_get_contents($this->jsonFile);
                $user = json_decode($jsonData, true);

                foreach ($user as $key => $value){
                    if($value['login'] == $login){
                        if(isset($updateUser['login'])){
                            $user[$key]['login'] = $updateUser['login'];
                        }
                        if(isset($updateUser['email'])){
                            $user[$key]['email'] = $updateUser['email'];
                        }
                        if(isset($updateUser['password'])){
                            $user[$key]['password'] = md5($updateUser['password']);
                        }
                        if(isset($updateUser['name'])){
                            $user[$key]['name'] = $updateUser['name'];
                        }
                    }         
                }
                $updateFile = file_put_contents($this->jsonFile, json_encode($user));
                return $updateFile?true:false;
            }
            else{
                return false;
            }
        }

        //method delete data about the user
        public function deleteUser($login){
            $jsonData = file_get_contents($this->jsonFile);
            $user = json_decode($jsonData, true);

            $deleteData = array_filter($user, function ($var) use ($login) {
                return ($var['login'] != $login);
            });
            $delete = file_put_contents($this->jsonFile, json_encode($deleteData));
            return $delete?true:false;
        }
    }
?>