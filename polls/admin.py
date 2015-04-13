from django.contrib import admin
from .models import Choice, Question

class ChoiceInline(admin.TabularInline):
	"""Special class for choice"""
	model = Choice
	extra = 3

class QuestionAdmin(admin.ModelAdmin):
    """Special question class for Admin"""
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['question_text']

admin.site.register(Question, QuestionAdmin)