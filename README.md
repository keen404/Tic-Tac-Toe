บัค/ปัญหา : ใช้ for..of เพื่อ Iterate array จาก querySelectorAll ไม่ได้
สาเหตุ: querySelectorAll ไม่ได้returnกลับเป็นarray แต่เป็น NodeList
วิธีแก้ไข: ใช้ forEach 

Implement: สร้างฟีเจอร์ใหม่
Fix: แก้บัค
Improve: Refactor / ปรับประสิทธิภาพ
Remove: ลบส่วนที่ไม่ใช้งาน
ตัวอย่าง: