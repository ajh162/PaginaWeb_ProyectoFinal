// Image Upload Functionality
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const processBtn = document.getElementById('processBtn');
const uploadArea = document.querySelector('.upload-area');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Show toast notification
function showToast(message, duration = 3000) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-color)';
    uploadArea.style.backgroundColor = 'rgba(58, 134, 255, 0.05)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    uploadArea.style.backgroundColor = 'transparent';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    uploadArea.style.backgroundColor = 'transparent';
    
    if (e.dataTransfer.files.length) {
        imageInput.files = e.dataTransfer.files;
        handleImageUpload(e.dataTransfer.files[0]);
    }
});

imageInput.addEventListener('change', function() {
    if (this.files[0]) {
        handleImageUpload(this.files[0]);
    }
});

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        processBtn.style.display = 'flex';
    }
    reader.readAsDataURL(file);
}

// Make the Choose File button work
const chooseFileBtn = document.getElementById('chooseFileBtn');
chooseFileBtn.addEventListener('click', function(e) {
    e.preventDefault();
    imageInput.click();
});

// Make the entire upload area clickable
uploadArea.addEventListener('click', function(e) {
    if (e.target === uploadArea || e.target.classList.contains('upload-text') || e.target.classList.contains('upload-icon')) {
        imageInput.click();
    }
});

processBtn.addEventListener('click', function() {
    // Simulate processing
    processBtn.disabled = true;
    processBtn.innerHTML = '<span class="material-icons btn-icon">hourglass_top</span>Processing...';
    
    setTimeout(() => {
        showToast('Uploaded image processed successfully!');
        processBtn.disabled = false;
        processBtn.innerHTML = '<span class="material-icons btn-icon">auto_fix_high</span>Process Image';
    }, 1500);
});

// Camera Functionality
const cameraBtn = document.getElementById('cameraBtn');
const cameraPreview = document.getElementById('cameraPreview');
const captureBtn = document.getElementById('captureBtn');
const stopCameraBtn = document.getElementById('stopCameraBtn');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('capturedImage');
const processCapturedBtn = document.getElementById('processCapturedBtn');
const cameraPlaceholder = document.getElementById('cameraPlaceholder');
let stream = null;

// Start camera function
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraPreview.srcObject = stream;
        cameraPreview.style.display = 'block';
        cameraPlaceholder.style.display = 'none';
        captureBtn.style.display = 'flex';
        stopCameraBtn.style.display = 'flex';
        cameraBtn.style.display = 'none';
        
        // Hide captured image if it was displayed
        capturedImage.style.display = 'none';
        processCapturedBtn.style.display = 'none';
    } catch (err) {
        console.error('Error accessing camera:', err);
        showToast('Could not access the camera. Please make sure you have granted permission.', 5000);
    }
}

cameraBtn.addEventListener('click', startCamera);

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        cameraPreview.style.display = 'none';
        cameraPlaceholder.style.display = 'flex';
        captureBtn.style.display = 'none';
        stopCameraBtn.style.display = 'none';
        cameraBtn.style.display = 'flex';
        stream = null;
    }
}

stopCameraBtn.addEventListener('click', function() {
    stopCamera();
});

captureBtn.addEventListener('click', function() {
    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
    
    capturedImage.src = canvas.toDataURL('image/png');
    capturedImage.style.display = 'block';
    processCapturedBtn.style.display = 'flex';
    
    stopCamera();
});

processCapturedBtn.addEventListener('click', function() {
    processCapturedBtn.disabled = true;
    processCapturedBtn.innerHTML = '<span class="material-icons btn-icon">hourglass_top</span>Processing...';
    
    
});
