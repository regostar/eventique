from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		# user = self.model(email=email, is_staff = False)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	
	def create_superuser(self, email, password=None):
		# as of now we will only create this on terminal or via db
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		# user.is_staff = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True, db_index=True)
	name = models.CharField(max_length=50)
	# is_staff = models.CharField(max_length=50)
	is_active = models.BooleanField(default=True)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []
	objects = AppUserManager()
	
	def __str__(self):
		return self.email
	
	@property
	def is_staff(self):
		return self.is_superuser