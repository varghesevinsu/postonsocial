document.addEventListener('DOMContentLoaded', function () {
    const calendarContent = [{
        contentDate: "10/01/2025",
        content: "Some content",
        isPosted: true
    }, {
        contentDate: "10/01/2025",
        content: "Some content",
        isPosted: true
    }, {
        contentDate: "10/01/2025",
        content: "Some content",
        isPosted: true
    }, {
        contentDate: "10/01/2025",
        content: "Some content",
        isPosted: true
    }, {
        contentDate: "10/01/2025",
        content: "Some content",
        isPosted: true
    }];
    const contentBody = document.getElementById("contentBody");
    let content = '';
    for (let i = 0; i < calendarContent.length; i++) {
        content += `
            <tr>
                <td>${calendarContent[i].contentDate}</td>
                <td>${calendarContent[i].content}</td>
                <td>${calendarContent[i].isPosted ? 'Yes' : 'No'}</td>
            </tr>
        `;
    }
    contentBody.innerHTML = content;

    document.getElementById('newContentBtn').addEventListener('click', function () {
        const newContentModal = new bootstrap.Modal(document.getElementById('newContentModal'));
        newContentModal.show();
    });

});

