[
  {
    '$lookup': {
      'from': 'messages',
      'let': {
        'room_id': '$_id'
      },
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$eq': [
                '$room', '$$room_id'
              ]
            }
          }
        }, {
          '$limit': 5
        }
      ],
      'as': 'messages'
    }
  }
]