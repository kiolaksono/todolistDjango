from django.db import models
# import models dari django
# models adalah module yang berisi class yang merepresentasikan tabel pada database
# class yang ada pada models adalah class yang akan dijadikan model pada database
from django.contrib.auth.models import User
# import User dari django.contrib.auth.models
# User adalah class yang merepresentasikan tabel user pada database
class Note(models.Model):
    # class Note adalah class yang akan merepresentasikan model Note
    # class Note adalah subclass dari class models.Model
    # class Note adalah tabel pada database

    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    # author adalah foreign key yang merujuk ke tabel User
    # on_delete=models.CASCADE artinya jika user dihapus maka semua note yang dimiliki user tersebut juga akan dihapus
    # related_name='notes' artinya kita bisa mengakses note yang dimiliki oleh user
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # str method adalah method yang akan dipanggil ketika object dicetak
        # str method akan mengembalikan string
        # string yang dikembalikan adalah title dari object
        return self.title
    