// Dynamic inputs logic to trigger update on change
document.addEventListener("DOMContentLoaded", () => {
    // Initial placeholders to make the resume preview look alive on load
    initializeFormAndData();

    // Event Delegation: Automatically update preview on any input changes in editor
    document.querySelector('.editor-pane').addEventListener('input', updatePreview);

    // Event listeners for adding sections
    document.getElementById('addExperienceBtn').addEventListener('click', addExperience);
    document.getElementById('addProjectBtn').addEventListener('click', addProject);
    document.getElementById('addEducationBtn').addEventListener('click', addEducation);

    // Print button logic
    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });
});

// Initial Setup with default data
function initializeFormAndData() {
    // Populate static fields
    document.getElementById('fullName').value = "Jane Doe";
    document.getElementById('jobTitle').value = "Senior Software Engineer";
    document.getElementById('email').value = "jane.doe@example.com";
    document.getElementById('phone').value = "+1 (555) 019-2834";
    document.getElementById('location').value = "San Francisco, CA";
    document.getElementById('website').value = "janedoe.dev";
    document.getElementById('summary').value = "Passionate Senior Software Engineer with over 5 years of experience in designing, building, and deploying scalable web applications. Strong track record in leadership and agile methodologies.";
    document.getElementById('skills').value = "JavaScript, React, Node.js, Python, AWS, Docker, GraphQL, CI/CD";

    // Add first item for experience, projects, and education
    addExperience("Tech Innovators Inc.", "Lead Developer", "Jan 2022 - Present", "• Led a team of 4 frontend engineers to build a cloud SaaS application.\n• Improved app loading speed by 40% using Code Splitting and Webpack optimizations.\n• Designed scalable REST APIs with Node.js and Express.");
    addEducation("University of California, Berkeley", "Bachelor of Science in Computer Science", "2016 - 2020", "GPA: 3.8/4.0");
    addProject("E-Commerce Microservices", "Feb 2023", "• Designed and developed scalable checkout services using Express and RabbitMQ.\n• Reduced transactional failures by 15% through robust state validation patterns.");

    updatePreview();
}

/* =========================================
   DYNAMIC INPUT ADDER / REMOVER FUNCTIONS
   ========================================= */

function addExperience(company = '', role = '', duration = '', desc = '') {
    const list = document.getElementById('experienceList');
    const itemId = `exp-${Date.now()}`;
    const div = document.createElement('div');
    div.className = 'dynamic-item experience-item';
    div.id = itemId;
    div.innerHTML = `
        <div class="dynamic-item-header">
            <h4>Work Experience</h4>
            <button class="btn-remove" onclick="removeItem('${itemId}')"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="exp-company" value="${company}" placeholder="e.g. Google">
            </div>
            <div class="form-group">
                <label>Role</label>
                <input type="text" class="exp-role" value="${role}" placeholder="e.g. Developer">
            </div>
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" class="exp-duration" value="${duration}" placeholder="e.g. Jan 2020 - Present">
        </div>
        <div class="form-group">
            <label>Description (Use • for bullets)</label>
            <textarea class="exp-desc" rows="3" placeholder="Describe achievements...">${desc}</textarea>
        </div>
    `;
    list.appendChild(div);
    updatePreview();
}

function addProject(title = '', date = '', desc = '') {
    const list = document.getElementById('projectList');
    const itemId = `proj-${Date.now()}`;
    const div = document.createElement('div');
    div.className = 'dynamic-item project-item';
    div.id = itemId;
    div.innerHTML = `
        <div class="dynamic-item-header">
            <h4>Project Entry</h4>
            <button class="btn-remove" onclick="removeItem('${itemId}')"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Project Title</label>
                <input type="text" class="proj-title" value="${title}" placeholder="e.g. Portfolio Website">
            </div>
            <div class="form-group">
                <label>Date/Timeline</label>
                <input type="text" class="proj-date" value="${date}" placeholder="e.g. Oct 2023">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="proj-desc" rows="3" placeholder="Describe project outcomes...">${desc}</textarea>
        </div>
    `;
    list.appendChild(div);
    updatePreview();
}

function addEducation(school = '', degree = '', date = '', gpa = '') {
    const list = document.getElementById('educationList');
    const itemId = `edu-${Date.now()}`;
    const div = document.createElement('div');
    div.className = 'dynamic-item education-item';
    div.id = itemId;
    div.innerHTML = `
        <div class="dynamic-item-header">
            <h4>Education Entry</h4>
            <button class="btn-remove" onclick="removeItem('${itemId}')"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>School / University</label>
                <input type="text" class="edu-school" value="${school}" placeholder="e.g. Stanford University">
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" value="${degree}" placeholder="e.g. B.Tech Computer Science">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Graduation Year/Dates</label>
                <input type="text" class="edu-date" value="${date}" placeholder="e.g. 2018 - 2022">
            </div>
            <div class="form-group">
                <label>GPA / Grade (Optional)</label>
                <input type="text" class="edu-gpa" value="${gpa}" placeholder="e.g. 8.5 CGPA">
            </div>
        </div>
    `;
    list.appendChild(div);
    updatePreview();
}

// Remove specific item and trigger update
function removeItem(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
        updatePreview();
    }
}

/* =========================================
   REAL-TIME PREVIEW RENDERING ENGINE
   ========================================= */

function updatePreview() {
    // 1. Static Personal Details mapping
    const fullName = document.getElementById('fullName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const website = document.getElementById('website').value;
    const summary = document.getElementById('summary').value;

    document.getElementById('pName').innerText = fullName || 'John Doe';
    document.getElementById('pTitle').innerText = jobTitle || 'Professional Role';

    // Toggle contact information based on inputs
    toggleContactField('pLocation', location);
    toggleContactField('pPhone', phone);
    toggleContactField('pEmail', email);
    toggleContactField('pWebsite', website);

    // Summary Toggle
    if (summary.trim()) {
        document.getElementById('pSummarySection').style.display = 'block';
        document.getElementById('pSummary').innerText = summary;
    } else {
        document.getElementById('pSummarySection').style.display = 'none';
    }

    // 2. Render Work Experience
    const expItems = document.querySelectorAll('.experience-item');
    const pExpList = document.getElementById('pExperienceList');
    pExpList.innerHTML = '';
    
    if (expItems.length > 0) {
        document.getElementById('pExperienceSection').style.display = 'block';
        expItems.forEach(item => {
            const company = item.querySelector('.exp-company').value;
            const role = item.querySelector('.exp-role').value;
            const duration = item.querySelector('.exp-duration').value;
            const desc = item.querySelector('.exp-desc').value;

            if (company || role) {
                const previewItem = document.createElement('div');
                previewItem.className = 'resume-item';
                previewItem.innerHTML = `
                    <div class="resume-item-header">
                        <span>${role || 'Developer'}</span>
                        <span>${duration}</span>
                    </div>
                    <div class="resume-item-subheader">
                        <span>${company || 'Company'}</span>
                    </div>
                    <p>${desc}</p>
                `;
                pExpList.appendChild(previewItem);
            }
        });
    } else {
        document.getElementById('pExperienceSection').style.display = 'none';
    }

    // 3. Render Projects
    const projItems = document.querySelectorAll('.project-item');
    const pProjList = document.getElementById('pProjectsList');
    pProjList.innerHTML = '';

    if (projItems.length > 0) {
        document.getElementById('pProjectsSection').style.display = 'block';
        projItems.forEach(item => {
            const title = item.querySelector('.proj-title').value;
            const date = item.querySelector('.proj-date').value;
            const desc = item.querySelector('.proj-desc').value;

            if (title) {
                const previewItem = document.createElement('div');
                previewItem.className = 'resume-item';
                previewItem.innerHTML = `
                    <div class="resume-item-header">
                        <span>${title}</span>
                        <span>${date}</span>
                    </div>
                    <p>${desc}</p>
                `;
                pProjList.appendChild(previewItem);
            }
        });
    } else {
        document.getElementById('pProjectsSection').style.display = 'none';
    }

    // 4. Render Education
    const eduItems = document.querySelectorAll('.education-item');
    const pEduList = document.getElementById('pEducationList');
    pEduList.innerHTML = '';

    if (eduItems.length > 0) {
        document.getElementById('pEducationSection').style.display = 'block';
        eduItems.forEach(item => {
            const school = item.querySelector('.edu-school').value;
            const degree = item.querySelector('.edu-degree').value;
            const date = item.querySelector('.edu-date').value;
            const gpa = item.querySelector('.edu-gpa').value;

            if (school || degree) {
                const previewItem = document.createElement('div');
                previewItem.className = 'resume-item';
                previewItem.innerHTML = `
                    <div class="resume-item-header">
                        <span>${school || 'Institution'}</span>
                        <span>${date}</span>
                    </div>
                    <div class="resume-item-subheader">
                        <span>${degree}</span>
                        <span>${gpa ? `GPA: ${gpa}` : ''}</span>
                    </div>
                `;
                pEduList.appendChild(previewItem);
            }
        });
    } else {
        document.getElementById('pEducationSection').style.display = 'none';
    }

    // 5. Render Skills
    const skills = document.getElementById('skills').value;
    if (skills.trim()) {
        document.getElementById('pSkillsSection').style.display = 'block';
        document.getElementById('pSkills').innerText = skills;
    } else {
        document.getElementById('pSkillsSection').style.display = 'none';
    }
}

// Utility function to show/hide dynamic contact fields on preview
function toggleContactField(elementId, value) {
    const element = document.getElementById(elementId);
    if (value.trim()) {
        element.style.display = 'inline-flex';
        element.querySelector('.val').innerText = value;
    } else {
        element.style.display = 'none';
    }
}