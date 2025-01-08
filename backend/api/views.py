from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
# serializers adalah module yang berisi class yang digunakan untuk mengubah data menjadi JSON
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Note

# Create your views here.


class NoteListCreate(generics.ListCreateAPIView):
    # NoteListCreate adalah class yang digunakan untuk menampilkan list dan membuat object baru
    # ListCreateAPIView adalah class yang digunakan untuk menampilkan list dan membuat object baru
    serializer_class = NoteSerializer
    # serializer_class adalah class yang digunakan untuk mengubah data menjadi JSON
    permission_classes = [IsAuthenticated]
    # permission_classes adalah class yang digunakan untuk memberikan permission kepada user

    def get_queryset(self):
        # untuk mengambil data dari database
        # data yang diambil adalah data yang dimiliki oleh user yang sedang login
        user = self.request.user
        # user adalah user yang sedang login
        return Note.objects.filter(author=user)
        # mengembalikan data yang dimiliki oleh user yang
    
    def perform_create(self, serializer):
        # untuk membuat object baru
        if serializer.is_valid():
            # jika serializer valid
            serializer.save(author=self.request.user)
            # maka object baru akan dibuat
        else:
            # jika serializer tidak valid akan menampilkan error
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes adalah class yang digunakan untuk memberikan permission kepada user

    def get_queryset(self):
        # untuk mengambil data dari database
        user = self.request.user
        # user adalah user yang sedang login
        return Note.objects.filter(author=user)
        

class CreateUserView(generics.CreateAPIView):
    # untuk handle create new user atau object baru
    queryset = User.objects.all() 
    # untuk mengambil data dan cek data apakah sudah ada atau belum
    # untuk make sure data yang dibuat belum exist
    # jika sudah ada maka akan muncul error
    # jika belum ada maka akan membuat data baru
    serializer_class = UserSerializer
    # untuk ngasih tau apa saja yang dibutuhkan
    # User adalah model yang akan digunakan
    permission_classes = [AllowAny]
    # untuk memberikan permission kepada user yang ingin membuat user baru
    # AllowAny artinya user yang ingin membuat user baru tidak perlu login terlebih dahulu
