-- Query to fetch TourRadar reviews with images and AI metadata
-- This pulls the latest 5000 reviews with quality images and destination info

SELECT
    ir.review_id,
    ir.image_id,
    aim.description                                                        AS ai_description,
    aim.quality_rating                                                     AS quality_score,
    CONCAT('https://cdn.tourradar.com/s3/review/original/', i.name)       AS cdn_link,
    c.name                                                                 AS destination
FROM tourradar.images_reviews ir
JOIN tourradar.images i
    ON i.id = ir.image_id
LEFT JOIN tourradar.images_ai_metadata aim
    ON aim.image_id = ir.image_id
LEFT JOIN tourradar.images_ai_destinations aid
    ON aid.image_id = ir.image_id
LEFT JOIN tourradar.cities c
    ON c.id = aid.destination_id
WHERE ir.deleted_at IS NULL
  AND aim.image_id IS NOT NULL
  AND aim.description IS NOT NULL
  AND aim.description != ''
  AND aid.destination_id IS NOT NULL
ORDER BY ir.review_id DESC
LIMIT 5000;
