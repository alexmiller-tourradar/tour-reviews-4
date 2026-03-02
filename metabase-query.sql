-- Updated SQL Query for Metabase to export TourRadar reviews data
-- Gets real customer names, tour IDs, operator names, and more reviews

SELECT
    r.id,
    t.name AS tourName,
    c.name AS tourDestination,
    r.real_name AS userName,
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' AS userAvatar,
    r.rating_overall AS rating,
    DATE_FORMAT(r.created_at, '%Y-%m-%d') AS date,
    SUBSTRING(r.comments, 1, 150) AS quote,
    r.comments AS fullReview,
    CONCAT('https://cdn.tourradar.com/s3/review/original/', i.name) AS imageUrl1,
    '' AS imageUrl2,
    '' AS imageUrl3,
    'false' AS verified,
    CONCAT('https://www.tourradar.com/t/', t.id) AS tourUrl,
    o.name AS operatorName
FROM tourradar.reviews r
JOIN tourradar.tours t ON t.id = r.tour_id
JOIN tourradar.images_reviews ir ON ir.review_id = r.id
JOIN tourradar.images i ON i.id = ir.image_id
LEFT JOIN tourradar.operators o ON o.id = r.operator_calculated
LEFT JOIN tourradar.images_ai_destinations aid ON aid.image_id = ir.image_id
LEFT JOIN tourradar.cities c ON c.id = aid.destination_id
WHERE r.active = '1'
  AND r.comments IS NOT NULL
  AND r.comments != ''
  AND r.rating_overall >= 4
  AND r.real_name IS NOT NULL
  AND r.real_name != ''
  AND r.is_anonymous = 0
ORDER BY r.created_at DESC
LIMIT 200;
