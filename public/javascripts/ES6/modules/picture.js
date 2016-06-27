/**
 * This function get a picture from an input
 * @param input
 * @param output
 */
function readURL(input, output) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = e => {
      output.attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function () {
  readURL(this, this);
});