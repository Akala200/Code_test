






 let userId = await jwt.verify(token, config.secretOrKey, (err, decoded) => {
      if (err) return res.status(500).json(responses.error(500, 'Failed to authenticate token.'));
      return decoded.id;
    });



