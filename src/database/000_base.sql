INSERT INTO casinos (name, alias, url, status) VALUES
('onewin', '1Win', 'https://onewin.com', true),
('onexbet', '1xBet', 'https://1xbet.com', true);

INSERT INTO games (name, alias, status) VALUES
('aviator', 'Aviator', true),
('jetx', 'Jetx', true),
('plinko', 'Plinko', true),
('mines', 'Mines', true),
('dice', 'Dice', true),
('crash', 'Crash', true),
('cosmic-cash', 'Cosmic Cash', true);

INSERT INTO groups(casino_id, game_id, strategy, strategy_alias, status) VALUES 
(1, 1, 'simple_strategy', 'Simple Strategy', true),
(1, 1, 'securest_strategy', 'Securest Strategy', true);

INSERT INTO channels (language, chat_id, status) VALUES 
('es', 'bot_de_aviator', true),
('en', 'best_avitor_predictor', true);

INSERT INTO channels_groups(channel_id, group_id) VALUES
(1, 1),
(2, 2);

INSERT INTO templates(channel_id, group_id, name, content) VALUES
(2, 1, 'bet', '✅ SIGNAL CONFIRMED! 🚀\n\n🎯 ENTER NOW!\n💰 Bet: After {last_score}x\n🎯 Exit: Cash out at {target}x!\n\n⚠️ MAXIMUM {martingales} MARTINGALES\n🔥 STAY DISCIPLINED!'),
(2, 1, 'wait', '🚨 ATTENTION! SIGNAL PREPARING 🚨\n\n⏰ Entry opportunity approaching...\n🔍 Waiting for confirmation...\n\n🎮 REGISTER NOW:\n🔗 <a href="https://1wfafs.life/v3/aviator-fire?p=4yz3">https://1wfafs.life/v3/aviator-fire?p=4yz3</a>'),
(2, 1, 'cancel', '❌ SIGNAL CANCELLED\n\n🔄 Analysis continuing...\n⏳ Waiting for new signal...\n💡 Be patient, opportunity will come!'),
(2, 1, 'win', '🎉 YOU WON! 💰\n\n🎯 Result: 2.00x\n✅ Target: 1.50x SUCCESS!\n\n📊 DAILY STATISTICS:\n━━━━━━━━━━━━━━━━━━━━\n✅ Wins: 1\n❌ Losses: 0\n━━━━━━━━━━━━━━━━━━━━\n💎 Success Rate: 100.00%\n\n🎰 PLAY AVIATOR: <a href="https://1wfafs.life/v3/aviator-fire?p=4yz3">here</a>'),
(2, 1, 'lose', '❌ LOSS\n\n😔 Not this time...\n💪 Wait for the next signal!\n🎯 Patience and discipline win.');