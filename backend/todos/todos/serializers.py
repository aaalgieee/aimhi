from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Todo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'status', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')