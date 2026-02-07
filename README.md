<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1xkYKsw7yYrH2ZRvtNrdRAzADLnVnutcP

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

תסריט הצגה לפרויקט (Project Defense Script)
1. Project Overview (על הפרויקט)
"הפרויקט שבניתי הוא Retro Terminal Todo – אפליקציה לניהול משימות אישיות (Personal Todo List).
בחרתי לעצב את האפליקציה בסגנון "Dark Mode" מינימליסטי, בהשראת מסופי קוד ישנים (Terminal), כדי לתת לה תחושה של כלי עבודה למפתחים ("Developer Tool").
המטרה הייתה ליצור ממשק נקי, ללא הסחות דעת, שמתמקד ביעילות ומהירות, תוך שימוש בטכנולוגיות העדכניות של React."
2. Component Structure (מבנה הקומפוננטות)
"כדי לשמור על קוד מסודר ומודולרי, חילקתי את האפליקציה לארבע קומפוננטות מרכזיות:
App: הקומפוננטה הראשית שמחזיקה את כל הלוגיקה.
TodoForm: אחראית על ה-Input של המשתמש והכפתור להוספת Todo חדש.
TodoList & TodoItem: קומפוננטות שאחראיות על התצוגה של הרשימה ועל הלוגיקה של כל שורה בנפרד (כמו מצב עריכה).
TodoStats: כאן איחדתי את כל האלמנטים של הניהול התחתון – הקומפוננטה הזו מציגה גם את המונה של 'משימות פעילות' (Active Items) וגם מכילה את כפתורי הסינון (Filters) כדי לשמור על UI מאורגן."
3. State Management (ניהול ה-State)
"השתמשתי בגישת Lifting State Up.
ה-State המרכזי, שהוא מערך ה-todos, מוגדר בקומפוננטת האב (App).
משם, אני מעביר את המידע (Data) ואת הפונקציות לשינוי המידע (כמו handleAdd או handleDelete) למטה כ-Props לקומפוננטות הילדים. זה מבטיח שיש לנו 'Single Source of Truth' לכל האפליקציה."
4. LocalStorage Logic (שמירת נתונים)
"כדי שהנתונים יישמרו גם אחרי שהמשתמש מרענן את הדף, השתמשתי ב-Hook של useEffect.
הגדרתי אותו כך שהוא ירוץ בכל פעם שיש שינוי במערך ה-todos. בתוך ה-Effect, אני הופך את המערך למחרוזת באמצעות JSON.stringify ושומר אותו ב-LocalStorage. בטעינה הראשונית של האפליקציה, אני מבצע את הפעולה ההפוכה וטוען את המידע."
5. Key Functions (פונקציות מרכזיות)
"בפונקציות הלוגיות, הקפדתי לעבוד בצורה שלא משנה את המידע הקיים (Immutability):
בפונקציות toggleTodo (סימון כבוצע) ו-editTodo, השתמשתי ב-Array Method של .map(). אני יוצר מערך חדש, בודק כל איבר לפי ה-ID שלו, ומחזיר אובייקט חדש רק עבור ה-Todo שצריך להשתנות.
בפונקציית deleteTodo, השתמשתי ב-.filter() כדי ליצור מערך חדש שכולל את כל המשימות חוץ מזו שאנחנו רוצים למחוק."
