var questions = [
    "I take time out for others.",
    "I know that I am not a special person.",
    "I take control of things.",
    "I try to forgive and forget.",
    "I keep in the background.",
    "I can't do without the company of others.",
    "I trust others.",
    "I am not easily frustrated.",
    "I cheer people up.",
    "I often feel uncomfortable around others."
];

$(function () {
    $('#survey').submit(submitForm);
    $('submit').click(submitForm);

    function submitForm(e) {
        e.preventDefault();
        var userData = {
            name: $('#name').val(),
            photo: $('#photo').val(),
            scores: $('select').map(function () { return $(this).val(); }).get()
        };

        $('#matchModal').modal('show');
        $.post('/api/friends', userData, function (closestMatch) {
            $('#survey').trigger('reset');
            $('#match-name').text(closestMatch.name);
            $('#match-image').attr('src', closestMatch.photo)
        });
    }

    function displayQuestions() {
        $('#questions').empty()
        questions.forEach(function (question, index) {
            var qID = 'q' + (index + 1);
            $('#questions').append(
                $('<div>')
                    .addClass('form-group')
                    .append(
                        $('<label>')
                            .attr('for', qID)
                            .append(
                                $('<h3>').html('<strong>Question ' + (index + 1) + '</strong>'),
                                $('<h4>').text(question)
                            ),
                        $('<select required>')
                            .attr('id', qID)
                            .attr('name', 'question')
                            .addClass('form-control chosen-select')
                            .append(
                                $('<option value="">').text('Select an Option'),
                                $('<option value="1">').text('1 (Strongly Disagree)'),
                                $('<option value="2">').text('2'),
                                $('<option value="3">').text('3'),
                                $('<option value="4">').text('4'),
                                $('<option value="5">').text('5 (Strongly Agree)')
                            )
                    )
            );
        })
    }

    $('#matchModal').on('hidden.bs.modal', function (event) {
        $('#match-name').text('Loading...');
        $('#match-image').attr('src', '');
    });

    displayQuestions();
});