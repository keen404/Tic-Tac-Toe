บัค/ปัญหา : พยายามใช้ Array Method กับผลลัพธ์ของ querySelectorAll
สาเหตุ: querySelectorAll คืนค่าเป็น NodeList (Array-like object) ไม่ใช่ Array แท้ ทำให้ไม่มี Method อย่าง .map() หรือ .filter()
วิธีแก้ไข: เปลี่ยนไปใช้ .forEach() ที่มีอยู่ใน NodeList อยู่แล้ว

บัค/ปัญหา : ดึงข้อมูลจาก method แล้วคืนค่า undefined
สาเหตุ: ลืมใส่วงเล็บ ตอนเรียกใช้งานเมธอด board.getBoard ทำให้ได้ตัวฟังก์ชั่นแทนผลลัพธ์ของฟังก๋ชั่น
วิธีแก้ไข: เช็ค typeOf เพื่อความแน่ใจ และเติม()ทุกครั้งเมื่อต้องการexecute

บัค/ปัญหา : เล่นเกมผ่านUI เมื่อชนะแล้วยังสามารถกดมาร์คลงบอร์ดได้อยู่
สาเหตุ: Method checkWinner ไม่สามารถลูปเพื่อเช็คให้ครบทุก pattern ได้เพราะมีการ return ทำให้ยกเลิก loop
วิธีแก้ไข: ใช้ Developer Tool เซ็น break point ไล่จุดที่มีผลเกี่ยวกับการจบเกม และเอาreturnออกไป

Implement: สร้างฟีเจอร์ใหม่
Fix: แก้บัค
Improve: Refactor / ปรับประสิทธิภาพ
Remove: ลบส่วนที่ไม่ใช้งาน
