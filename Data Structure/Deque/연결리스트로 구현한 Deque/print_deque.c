/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_deque.h                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 19:49:26 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 19:53:40 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "deque.h"

void	print_deque(t_queue *queue)
{
	int len;
	t_node *tmp;

	len = 0;
	if(queue == NULL || queue->size == 0)
		return ;
	tmp = queue->front;
	while(tmp)
	{
		printf("%d\n",tmp->data);
		tmp = tmp->next;
	}
	return ;
}
