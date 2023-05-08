export const helpersAuthError = {
    authErrorCodeMessage: (authCode: string | null) => {
        switch (authCode) {
            case "auth/email-already-in-use":
                return "บัญชีผู้ใช้นี้ มีอยู่ในระบบแล้ว \n รบกวน ลงทะเบียนด้วยบัญชีใหม่ด้วยนะค่ะ"
            case "auth/wrong-password":
                return "รหัสผ่าน ไม่ถูกต้องนะค่ะ , กรุณายืนยันใหม่อีกครั้ง";
            case "auth/weak-password":
                return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร นะค่ะ"
            case "auth/invalid-email":
                return "อีเมล์ ไม่ถูกต้องนะค่ะ , กรุณายืนยันใหม่อีกครั้ง";
            case "auth/user-not-found":
                return "ไม่พบรายชื่อผู้ใช้ ในระบบนะค่ะ";
            case "auth/too-many-requests":
                return "เกินกำหนด จำนวนการ เชื่อมต่อฐานข้อมูล";
            case "auth/no-current-user":
                return "ไม่พบรายชื่อผู้ใช้ ในระบบนะค่ะ";
            case "auth/internal-error":
                return "เกิดข้อผิดพลาด , รบกวนลองใหม่อีกครั้ง"
            default:
                return "เกิดข้อผิดพลาด , รบกวนลองใหม่อีกครั้ง"
        }
    },
}