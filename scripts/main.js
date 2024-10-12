document.addEventListener('DOMContentLoaded', () => {
    // Load projects
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects');
            data.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project', 'card', 'mb-3');
                projectElement.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${project.image}" class="img-fluid rounded-start" alt="${project.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                <a href="${project.link ? project.link : '#'}" class="btn btn-primary project-link" ${project.link ? 'target="_blank"' :
                                'data-bs-toggle="modal" data-bs-target="#academicHonestyModal"'}>${project.link ? 'View Project' : 'Academic Honesty Notice'}</a>
                            </div>
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(projectElement);
            });
        });

    // Load resume
    fetch('resume.json')
        .then(response => response.json())
        .then(data => {
            const resumeContainer = document.getElementById('resume');
            const education = data.education.map(edu => `
                <div class="education">
                    <h4>${edu.degree}</h4>
                    <p><strong>${edu.institution}</strong> • <strong>GPA: </strong>${edu.gpa} • ${edu.graduation}</p>
                    ${edu.minor ? `<p> <strong>Minor: </strong>${edu.minor}</p>` : ''}
                    <p><strong>Honors: </strong>${edu.honors.join(', ')}</em></p>
                    ${edu.courses ? `<p><strong>Relevant Courses: </strong>${edu.courses.join(', ')}</p>` : ''}
                </div>
            `).join('');
            const experience = data.experience.map(exp => `
                <div class="experience">
                    <h4>${exp.title}</h4>
                    <p><strong>${exp.company}</strong> • ${exp.dates}</p>
                    <ul>${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}</ul>
                </div>
            `).join('');
            const projects = data.projects.map(proj => `
                <div class="resume-project">
                    <h4>${proj.title}</h4>
                    <ul>${proj.description.map(resp => `<li>${resp}</li>`).join('')}</ul>
                </div>
            `).join('');
            const achievements = data.achievements.map(ach => `
                <div class="achievement">
                    <h4>${ach.title} • ${ach.dates}</h4>
                    <ul>${ach.description.map(resp => `<li>${resp}</li>`).join('')}</ul>
                </div>
            `).join('');
            const skills = `<p><strong>Skills: </strong>${data.skills.join(', ')}</p>`;
            const tools = `<p><strong>Tools & Technologies: </strong>${data.tools.join(', ')}</p>`;
            resumeContainer.innerHTML = `
                <h2>Education</h2>${education}
                <h2>Experience</h2>${experience}
                <h2>Projects</h2>${projects}
                <h2>Achievements</h2>${achievements}
                <h2>Skills & Tools</h2>${skills}${tools}
            `;
        });

    // Load bio
    fetch('bio.json')
        .then(response => response.json())
        .then(data => {
            const aboutContainer = document.getElementById('about');
            aboutContainer.innerHTML = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${data.image}" class="img-fluid rounded-circle" alt="${data.name}">
                    </div>
                    <div class="col-md-8">
                        <h1>About Me</h1>
                        ${data.bio.map(resp => `<p>${resp}</p>`).join('\n')}
                    </div>
                </div>
            `;
        });
    
        // Adjust scroll position for sticky navbar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offset = 80; // Adjust this value based on your navbar height
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});
