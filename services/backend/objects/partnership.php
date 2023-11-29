<?php
    require './vendor/autoload.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $company = trim($_POST['company']);
    $message = trim($_POST['message']);

    if (!$name || !$email || !$phone || !$company || !$message){
        return sendResponse(false, "Заполните все поля");
    }

    $messageText = "Имя: {$name}\nТелефон: {$phone}\nПочта: {$email}\nКомпания: {$company}\nСообщение: $message.";
    $mail = new PHPMailer(true);

    try { 
        $mail->CharSet = 'UTF-8';
        $mail->IsSMTP();
        $mail->Host       = 'smtp.mail.ru';                        
        $mail->SMTPAuth   = true;                           
        $mail->Username   = $_ENV['SMTP_NAME'];                 
        $mail->Password   = $_ENV['SMTP_PASSWORD'];                 
        $mail->SMTPSecure = "ssl";
        $mail->Port       = 465;
           
        $mail->From = $_ENV['SMTP_NAME'];
        $mail->FromName = "Заявитель";
        $mail->addAddress("acrecare@mail.ru");
        
        $mail->isHTML(false);
        $mail->Subject = "Заявка на сотрудничество";
        $mail->Body = $messageText;

        $mail->send();
        sendResponse(true);
    } catch (Exception $e) {
        sendResponse(false);
    }

    function sendResponse($status, $msg = null){
        $response = [
            'status' => $status,
        ];
        if ($msg) {
            $response['message'] = $msg;
        }
        echo json_encode($response);
    }   
?>