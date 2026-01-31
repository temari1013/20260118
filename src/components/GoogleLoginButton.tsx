import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

export type UserData = {
  email: string;
};

type GoogleLoginButtonProps = {
  handleValueChange: (data: UserData) => void;
};

export const GoogleLoginButton = ({ handleValueChange }: GoogleLoginButtonProps) => {
  // ログイン成功時の処理
   const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    // バックエンドへのリクエスト
    fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${credentialResponse.credential}`,
      },
      credentials: 'include',
       body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((response) => response.json())
      .then((data: UserData) => {
        console.log("Email adress: ", data.email);
        //親要素へユーザーデータを渡す
        handleValueChange(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  // ログイン失敗時の処理
  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
  );
};


