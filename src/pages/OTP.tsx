import { useCallback, useState } from "react";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../contants/firebase";

function OTP() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [message, setMessage] = useState("");

  const setUpRecaptcha = useCallback(() => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: string) => {
          console.log("reCAPTCHA verified:", response);
          sendOtp(); // Gọi sendOtp sau khi reCAPTCHA xác minh
        },
        "expired-callback": () => {
          setMessage("reCAPTCHA hết hạn, vui lòng thử lại.");
        },
      }
    );
  }, []);

  const validatePhoneNumber = useCallback((input: string): string | null => {
    const cleaned = input.replace(/\D/g, "");
    if (cleaned.length < 9 || cleaned.length > 10) {
      return null;
    }
    const normalized = cleaned.startsWith("0") ? cleaned.slice(1) : cleaned;
    return `+84${normalized}`;
  }, []);

  const sendOtp = async () => {
    setUpRecaptcha();
    const phone = validatePhoneNumber(phoneNumber);
    if (!phone) {
      setMessage(
        "Số điện thoại không hợp lệ. Vui lòng nhập số Việt Nam (9-10 chữ số)."
      );
      return;
    }
    console.log(phone);
    try {
      await window.recaptchaVerifier.render();
      const result = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      console.log(confirmationResult);
      setConfirmationResult(result);
      setMessage("Mã OTP đã được gửi!");
    } catch (error) {
      setMessage("Lỗi khi gửi OTP: " + error);
    }
  };

  const verifyOtp = useCallback(async () => {
    if (!confirmationResult) return;
    try {
      const result = await confirmationResult.confirm(otp);
      setMessage("Xác minh thành công! UID: " + result.user.uid);
      const idToken = await result.user.getIdToken();
      console.log("ID Token:", idToken);
    } catch (error: any) {
      setMessage("Xác minh thất bại: " + error.message);
    }
  }, []);

  return (
    <div className="OTP">
      <h1>Xác minh số điện thoại</h1>
      <div>
        <label>Số điện thoại (912345678):</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Nhập số điện thoại"
        />
        <button onClick={sendOtp}>Gửi OTP</button>
        <div id="recaptcha-container"></div>
      </div>

      {true && (
        <div>
          <label>Nhập mã OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
          />
          <button onClick={verifyOtp}>Xác minh OTP</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default OTP;
