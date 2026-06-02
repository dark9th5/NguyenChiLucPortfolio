# 🚀 Hướng Dẫn Deploy Website Portfolio Của Bạn

Portfolio của bạn là một trang web tĩnh (gồm **`index.html`**, **`style.css`**, và **`script.js`**). Điều này rất tuyệt vời vì bạn có thể host nó **hoàn toàn miễn phí** với độ trễ cực thấp bằng các dịch vụ đám mây hàng đầu.

Dưới đây là 3 phương pháp deploy tốt nhất, nhanh nhất và được các lập trình viên ưa chuộng nhất.

---

## 🛠️ Cách 1: Deploy lên GitHub Pages (Khuyên Dùng Cho Developer)
*Đây là phương pháp tốt nhất vì nó giúp bạn quản lý mã nguồn bằng Git và tự động cập nhật website mỗi khi bạn cập nhật code.*

### Bước 1: Tạo Repository trên GitHub
1. Truy cập [github.com](https://github.com/) và đăng nhập (hoặc đăng ký nếu chưa có tài khoản).
2. Nhấn nút **New** (hoặc dấu `+` ở góc phải) để tạo một repository mới.
3. Đặt tên cho repository (ví dụ: `portfolio` hoặc `<username>.github.io`).
   > **Mẹo:** Nếu bạn đặt tên repository chính xác là `<username>.github.io` (với `<username>` là tên tài khoản GitHub của bạn), trang web của bạn sẽ có URL cực đẹp là `https://<username>.github.io/`.
4. Để chế độ **Public**. Không tích chọn thêm file README, `.gitignore` hay License (vì dự án của bạn đã có sẵn).
5. Nhấn **Create repository**.

### Bước 2: Push code từ máy của bạn lên GitHub
Mở Terminal/PowerShell tại thư mục `d:\Portfolio\portfolio` và chạy các lệnh sau:

```bash
# 1. Khởi tạo git
git init

# 2. Add toàn bộ các file vào git staging
git add .

# 3. Commit code
git commit -m "First commit: Premium developer portfolio"

# 4. Đổi tên branch chính thành main
git branch -M main

# 5. Liên kết với repository trên GitHub (Thay URL bằng link repo của bạn)
git remote add origin https://github.com/<username>/<repo-name>.git

# 6. Push code lên GitHub
git push -u origin main
```

### Bước 3: Kích hoạt GitHub Pages
1. Trên giao diện Repository của bạn trên GitHub, chọn tab **Settings** (Cài đặt).
2. Ở menu bên trái, tìm và chọn mục **Pages**.
3. Tại phần **Build and deployment** -> **Branch**:
   - Chọn branch là **`main`**.
   - Thư mục chọn là **`/ (root)`**.
4. Nhấn nút **Save**.
5. Đợi khoảng 1-2 phút, GitHub sẽ hiển thị đường link trang web của bạn ở phía trên cùng trang Settings Pages (dạng `https://<username>.github.io/<repo-name>/`).

---

## ⚡ Cách 2: Deploy lên Vercel (Cực Nhanh & Mượt)
*Vercel cung cấp hạ tầng CDN toàn cầu siêu nhanh, hỗ trợ cả giao diện kéo-thả trực quan lẫn CLI.*

### Phương án A: Kéo - Thả (Không cần dòng lệnh)
1. Truy cập trang web [vercel.com](https://vercel.com/) và đăng nhập (khuyên dùng đăng nhập bằng tài khoản GitHub).
2. Vào trang Dashboard, chọn **Add New...** -> **Project**.
3. Ở dưới cùng, bạn sẽ thấy phần **"Deploy a new project without Git? Drag and drop a folder here."**.
4. Kéo thư mục chứa portfolio của bạn (`portfolio`) thả vào vùng này.
5. Vercel sẽ tự động deploy và cấp cho bạn một đường link miễn phí dạng `https://your-project.vercel.app` chỉ sau 5 giây!

### Phương án B: Liên kết trực tiếp với GitHub (Tự động deploy khi push code)
1. Đăng nhập vào Vercel bằng tài khoản GitHub.
2. Chọn **Add New...** -> **Project**.
3. Tại phần **Import Git Repository**, chọn repository portfolio bạn đã push ở Cách 1.
4. Giữ nguyên các thiết lập mặc định (Vercel sẽ tự nhận diện đây là static HTML project).
5. Nhấn **Deploy**. Mỗi lần bạn `git push` code mới lên GitHub, website trên Vercel sẽ tự động cập nhật ngay lập tức!

---

## 🌐 Cách 3: Deploy lên Netlify (Đơn Giản Trong 10 Giây)
*Netlify là giải pháp kéo-thả nổi tiếng dành trước cho web tĩnh.*

1. Truy cập [netlify.com](https://www.netlify.com/) và đăng nhập.
2. Điều hướng đến tab **Sites**.
3. Kéo toàn bộ thư mục `portfolio` của bạn và thả vào vùng **"Drag and drop your site folder here"** ở cuối trang.
4. Quá trình deploy sẽ hoàn tất ngay lập tức! Bạn có thể vào phần **Site configuration** để đổi tên miền `.netlify.app` tùy ý hoặc trỏ tên miền riêng của bạn vào.

---

> **💡 Lời khuyên tối ưu Portfolio trước khi Deploy:**
> 1. **Kiểm tra thông tin cá nhân**: Hãy chắc chắn bạn đã thay đổi số điện thoại, email, link GitHub, LinkedIn trong file `index.html` thành thông tin thật của mình.
> 2. **Ảnh đại diện/Avatar**: Nếu bạn có sử dụng hình ảnh cá nhân hoặc logo dự án, hãy đặt chúng vào cùng thư mục và liên kết chính xác đường dẫn tương đối trong HTML (ví dụ: `src="./avatar.png"`).
