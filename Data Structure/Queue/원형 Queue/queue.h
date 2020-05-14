/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   queue.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/27 14:43:24 by secho             #+#    #+#             */
/*   Updated: 2020/04/27 15:49:57 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef QUEUE_H
# define QUEUE_H

# include <stdio.h>
# include <stdlib.h>

typedef struct s_queue
{
	int max_size;
	int *data;
	int front;
	int rear;

}				t_queue;

t_queue *init(void);
void	enQueue(t_queue *queue, int value);
void	deQueue(t_queue *queue);
#endif
