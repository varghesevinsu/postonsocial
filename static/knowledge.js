document.addEventListener('DOMContentLoaded', function () {
    const knowledgeBase = [{
        fileName: "10/01/2025",
        description: "Some description",
        isPosted: true
    }, {
        fileName: "10/01/2025",
        description: "Some description",
        isPosted: true
    }, {
        fileName: "10/01/2025",
        description: "Some description",
        isPosted: true
    }, {
        fileName: "10/01/2025",
        description: "Some description",
        isPosted: true
    }, {
        fileName: "10/01/2025",
        description: "Some description",
        isPosted: true
    }];
    const descriptionBody = document.getElementById("knowledgeBody");
    let description = '';
    for (let i = 0; i < knowledgeBase.length; i++) {
        description += `
            <tr>
                <td>${knowledgeBase[i].fileName}</td>
                <td>${knowledgeBase[i].description}</td>
                <td>${knowledgeBase[i].isPosted ? 'Yes' : 'No'}</td>
            </tr>
        `;
    }
    descriptionBody.innerHTML = description;
 
    document.getElementById('newKnowledgeBtn').addEventListener('click', function () {
        const newdescriptionModal = new bootstrap.Modal(document.getElementById('newKnowledgeModal'));
        newdescriptionModal.show();
    }); 

});

