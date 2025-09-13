import math
import numpy as np
import pandas as pd

from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

catalog = pd.read_csv("clothing.csv")

# TODO: from the app, get a user swipes where the information is similar
# to the catalog with an extra variable 1/0 where it shows if the person likes it or not
df = pd.read_csv("user_swipes.csv")  


X = df[["style", "color", "type"]] # different categories
y = df["swipe"] # 1 or 0


# Initializes the Encoder
# One Hot Encoder changes all data values into 1 or 0 so that the data can be processed
encoder = OneHotEncoder(handle_unknown="ignore")
# Fit and Transforms to the array
X_encoded = encoder.fit_transform(X).toarray()


# Training and testing the model from the same data
X_train, X_test, y_train, y_test = train_test_split(
    X_encoded, y, test_size=0.2, random_state=42
)

# Create a regression to see what the user would like
model = LogisticRegression(max_iter=500)
model.fit(X_train, y_train)

print("✅ Model trained. Accuracy:", model.score(X_test, y_test))

def prediction(style, color, clothing_type):
    """Return probability that user likes an item"""
    X_new = encoder.transform([[style, color, clothing_type]]).toarray()
    prob = model.predict_proba(X_new)[0][1]
    return prob

print("Emo top:", prediction("emo", "black", "top"))
print("Twee dress:", prediction("twee", "black", "dress"))

def recommend_items(catalog, top_n=3):
    scores = []
    for _, row in catalog.iterrows():
        prob = prediction(row["style"], row['color'], row["type"])
        scores.append((row["image"], row["color"], row["style"], row["type"], prob))
   
    scored_df = pd.DataFrame(scores, columns=["image", "style", "color", "type", "score"])
    return scored_df.sort_values("score", ascending=False).head(top_n)

def recommend_outfits():


    assert NotImplementedError